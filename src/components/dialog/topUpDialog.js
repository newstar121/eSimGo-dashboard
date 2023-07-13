import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Flex, Text, Button, useDisclosure, SimpleGrid, InputGroup, InputLeftAddon, Input, Icon } from "@chakra-ui/react";
import { useGlobalData } from "contexts/AppContext";
import { useEffect, useState } from "react";
import { MdCreditCard, MdEventBusy, MdMap, MdMoreHoriz, MdPerson } from "react-icons/md";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { formatCreditCardNumber } from "utils/constant";
import { formatExpirationDate } from "utils/constant";
import { formatCVC } from "utils/constant";
import { getOrganisationBalance } from "contexts/AppContext";
import { getOrganisations } from "contexts/AppContext";

export const TopUpDialog = ({ isOpen, handleClose }) => {

    const {
        isOpen: isOpenTopUp,
        onOpen: onOpenTopUp,
        onClose: onCloseTopUp,
    } = useDisclosure();

    useEffect(() => {
        if (isOpen) {
            onOpenTopUp()
        } else {
            onCloseTopUp()
        }

    }, [isOpen])

    const onClose = () => {
        handleClose()
        onCloseTopUp()
    }

    const [state, { updateOrganisations, updateUser }] = useGlobalData()

    const getOrganisation = () => {

        let organisations = state?.organisations || [];
        let user = state?.user;
        let userId = state?.user?.id;

        let findIndex = organisations.findIndex((organisation) => {
            let findUserIndex = organisation.users.findIndex((user) => user.id === userId)
            return findUserIndex > -1;
        })

        if (findIndex > -1) {
            return organisations[findIndex]
        } else {
            return undefined
        }
    }

    const organisation = getOrganisation();

    const balance = organisation?.balance.toFixed(2) || 0.00;
    const maxSpend = organisation?.maxSpend.toFixed(2) || 0.00;
    const minimumSpend = organisation?.minimumSpend.toFixed(2) || 0.00;
    const currentSpend = organisation?.currentSpend.toFixed(2) || 0.00;
    const billingName = organisation ? organisation?.billingFirstNames + ' ' + organisation?.billingSurname : '';
    const billingContentStr = organisation ? organisation?.billingAddr1 + ', ' + organisation?.billingAddr2
        + ', ' + organisation?.billingCity + ', ' + organisation?.billingPostcode
        + ', ' + organisation?.billingState + ', ' + organisation?.registeredCountry : '';
    const billingContent = billingContentStr.replace(/,\s,/g, ",")

    const [currentTopUpSpend, setCurrentTopUpSpend] = useState(0)

    const handleCurrentChange = (value) => {
        setCurrentTopUpSpend(parseFloat(value))
    }

    const [payment, setPayment] = useState({
        number: "",
        name: "",
        expiry: "",
        cvc: "",
        issuer: "",
        focused: "",
        formData: null,
    });

    function handleCallback({ issuer }, isValid) {
        
        if (isValid) {
            setPayment(Object.assign({}, payment, {issuer: issuer}))
        }
    }

    const handleInputFocus = (target) => {
        setPayment((prevState) => ({ ...prevState, focused: target.name }));
    }

    const { name, number, expiry, cvc, focused, issuer } = payment;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPayment((prevState) => ({ ...prevState, [name]: value }));
    };

    const onTopUpAccount = () => {
        if (currentTopUpSpend < minimumSpend) {
            return
        }
        getOrganisationBalance({
            amount: currentTopUpSpend,
            browserScreenHeight: 500,
            browserScreenWidth: 1092,
            cardHolder: payment.name,
            cardNumber: payment.number,
            cardType: payment.issuer.toUpperCase(),
            cv2: payment.cvc,
            expiryDate: payment.expiry
        }).then((result) => {
            if(!result || result && result.message) return;
            getOrganisations().then((response) => {
                updateOrganisations(response.data.organisations)
                updateUser(response.data.user)
            })
        })
    }

    return (
        <Modal
            isOpen={isOpenTopUp}
            onClose={onClose}
            size="xl"
        >
            <ModalOverlay />
            <ModalContent minW='800px'>
                <ModalHeader display='flex' alignItems='center' justifyContent='space-between'>
                    <Flex direction='column' flex='1'>
                        <Flex align='center' justify='space-between'>

                            <Text fontSize='2xl' color='black' fontWeight='700'>
                                Account Top Up
                            </Text>
                            <Flex >
                                <Text color='secondaryGray.600' fontSize='lg'>Current Balance:</Text>
                                <Text color='green' fontSize='lg' fontWeight='700' ml='10px'>${balance}</Text>
                            </Flex>
                        </Flex>
                        <Flex align='center' justify='space-between'>

                            <Text fontSize='lg' color='black' fontWeight='500'>
                                Enter the details below to top up your account
                            </Text>
                            <Flex >
                                <Text color='secondaryGray.600'>Daily Top-Up Limit:</Text>
                                <Text color='green' fontSize='lg' fontWeight='700' ml='10px'>${currentSpend}</Text>
                                <Text color='secondaryGray.600' ml='10px'>/</Text>
                                <Text color='green' fontSize='lg' fontWeight='700' ml='10px'>${maxSpend}</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex align='center' justify='center' ml='30px' mt='-15px'>
                        <ModalCloseButton focused="false" position='relative' size="25px" />
                    </Flex>
                </ModalHeader>

                <ModalBody pb={6}>

                    <Flex direction='column'>
                        <Text fontSize='md' fontWeight='700' color='secondaryGray.600'>Top Up Amount(min.${minimumSpend})</Text>

                        <InputGroup>
                            <InputLeftAddon children='$' />
                            <Input
                                placeholder='Current Total Up Amount'
                                value={currentTopUpSpend ? currentTopUpSpend : 0}
                                onChange={(e) => { handleCurrentChange(e.target.value) }}
                            />
                        </InputGroup>

                        <Text fontSize='xl' fontWeight='700' color='black' mt='20px'>Billing Address</Text>
                        <Flex border='1px' borderStyle='solid' borderRadius='10px' align='center' justify='space-between' p='20px' mt='10px'>
                            <Flex align='center'>
                                <Icon as={MdMap} width='25px' height='25px' color='blue' mr='20px' />
                                <Flex direction='column'>
                                    <Text fontWeight='700' fontSize='xl' mr='10px'>{billingName}</Text>
                                    <Text fontWeight='700' fontSize='xl' color='secondaryGray.500'>{billingContent}</Text>
                                </Flex>
                            </Flex>
                            {/* <Text fontWeight='700' fontSize='2xl' color='blue' mr='10px' onClick={handleBilling} className="icon-hover">CHANGE</Text> */}
                        </Flex>

                        <Text fontSize='xl' fontWeight='700' color='black' mt='20px'>Card Detail</Text>
                        <Text fontSize='lg' color='black' fontWeight='500'>
                            Enter your card details below to top-up your account
                        </Text>
                        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='10px' mt='10px'
                            border='1px' borderRadius='10px' p='10px'
                        >
                            <Cards
                                number={number}
                                name={name}
                                expiry={expiry}
                                cvc={cvc}
                                focused={focused}
                                acceptedCards={['visa', 'mastercard']}
                                callback={handleCallback}
                            />
                            <Flex direction='column' justify='space-around'>
                                <InputGroup size='lg'>
                                    <InputLeftAddon children={
                                        <MdCreditCard size='24'></MdCreditCard>
                                    } />
                                    <Input
                                        type="tel"
                                        name="number"
                                        placeholder="Card Number"
                                        // pattern="/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/"
                                        required
                                        onFocus={handleInputFocus}
                                        onChange={handleInputChange}
                                    />
                                </InputGroup>

                                <Flex align='center'>

                                    <InputGroup size='lg'>
                                        <InputLeftAddon children={
                                            <MdEventBusy size='24'></MdEventBusy>
                                        } />
                                        <Input
                                            type="tel"
                                            name="expiry"
                                            placeholder="Expiry Date"
                                            pattern="\d\d/\d\d"
                                            required
                                            mr='2px'
                                            onFocus={handleInputFocus}
                                            onChange={handleInputChange}
                                        />
                                    </InputGroup>
                                    <InputGroup size='lg'>
                                        <InputLeftAddon children={
                                            <MdMoreHoriz size='24'></MdMoreHoriz>
                                        } />
                                        <Input
                                            type="tel"
                                            name="cvc"
                                            placeholder="CVV"
                                            pattern="\d{3,4}"
                                            required
                                            ml='2px'
                                            onFocus={handleInputFocus}
                                            onChange={handleInputChange}
                                        />
                                    </InputGroup>
                                </Flex>
                                <InputGroup size='lg'>
                                    <InputLeftAddon children={
                                        <MdPerson size='24'></MdPerson>
                                    } />
                                    <Input
                                        type="text"
                                        name="name"
                                        placeholder="Card Holder Name"
                                        required
                                        onFocus={handleInputFocus}
                                        onChange={handleInputChange}
                                    />
                                </InputGroup>

                            </Flex>
                        </SimpleGrid>
                        <Flex justify='flex-end' w='100%'>

                            <Flex direction='column' w='fit-content'>
                                <Text fontSize='md' fontWeight='500' color='black' mt='10px' textAlign='right'>VAT @ 20%</Text>
                                <Text fontSize='md' fontWeight='500' color='black' mt='10px' textAlign='right'>Total</Text>
                                <Text fontSize='md' fontWeight='500' color='black' mt='10px' textAlign='right'>New Balance</Text>
                            </Flex>
                            <Flex direction='column' w='fit-content' justify='flex-end' ml='50px'>
                                <Text fontSize='md' fontWeight='500' color='black' mt='10px' textAlign='right'>{currentTopUpSpend > 0 ? ((parseFloat(balance) + parseFloat(currentTopUpSpend)) * 0.2).toFixed(2) : 0}</Text>
                                <Text fontSize='md' fontWeight='500' color='black' mt='10px' textAlign='right'>{currentTopUpSpend > 0 ? ((parseFloat(balance) + parseFloat(currentTopUpSpend)) * 0.8).toFixed(2) : 0}</Text>
                                <Text fontSize='md' fontWeight='500' color='black' mt='10px' textAlign='right'>{currentTopUpSpend > 0 ? (parseFloat(balance) + parseFloat(currentTopUpSpend)).toFixed(2) : balance}</Text>
                            </Flex>
                        </Flex>
                    </Flex>

                </ModalBody>

                <ModalFooter>
                    <Button onClick={onClose}>CANCEL</Button>
                    <Button colorScheme='blue' ml={3} onClick={onTopUpAccount}>
                        TOP UP ACCOUNT
                    </Button>

                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}