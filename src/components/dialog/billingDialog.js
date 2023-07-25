import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Flex, Text, Button, useDisclosure, SimpleGrid, Input, Icon, Image } from "@chakra-ui/react";
import { useGlobalData } from "contexts/AppContext";
import { useEffect} from "react";
import { MdPerson } from "react-icons/md";
import axios from "axios";
import { API_URL } from "utils/constant";
import { getOrganisations } from "contexts/AppContext";
import { API_KEY } from "utils/constant";

export const BillingDialog = ({ isOpen, handleClose }) => {

    const {
        isOpen: isOpenBilling,
        onOpen: onOpenBilling,
        onClose: onCloseBilling,
    } = useDisclosure();

    useEffect(() => {
        if (isOpen) {
            onOpenBilling()
        } else {
            onCloseBilling()
        }

    }, [isOpen])

    const onClose = () => {
        handleClose()
        onCloseBilling()
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
    const firstName = organisation?.billingFirstNames || ''
    const lastName = organisation?.billingSurname || ''
    const address1 = organisation?.billingAddr1 || ''
    const address2 = organisation?.billingAddr2 || ''
    const city = organisation?.billingCity || ''
    const postcode = organisation?.billingPostcode || ''
    const country = organisation?.country || ''
    const groups = organisation?.groups || []
    const id = organisation?.id || ''
    // const countryName = state?.countries?.countries[country.toLowerCase()] || ''

    const onSave = () => {
        axios.put(
            API_URL + 'organisations',
            {
                accountManager: null,
                addr1: null,
                addr2: null,
                allowRefunds: null,
                apiMaxBurst: null,
                apiTokenReplenishAmount: null,
                apiTokenReplenishTimeSeconds: null,
                apiTokensPerCall: null,
                autoTopupAmount: null,
                balance: null,
                balanceNotificationEmails: null,
                balanceReason: null,
                billingAddr1: address1,
                billingAddr2: address2,
                billingCity: city,
                billingEmail: null,
                billingFirstNames: firstName,
                billingPhone: null,
                billingPostcode: postcode,
                billingState: "",
                billingSurname: lastName,
                businessType: null,
                callbackUrl: null,
                callbackVersion: null,
                city: null,
                closedDate: null,
                country: null,
                currency: null,
                customTerms: null,
                groups: groups,
                id: id || '',
                isAdmin: null,
                isClosedDown: null,
                isOnboarded: null,
                isPrepaid: null,
                maxSpend: null,
                maximumRefundPeriod: null,
                minimumBalance: null,
                minimumSpend: null,
                name: "Clowdnet Services Ltd",
                notes: null,
                orgBalanceThreshold: null,
                postcode: null,
                productDescription: null,
                registeredCountry: country,
                secondStageValidation: null,
                secondStageValidationComplete: null,
                sendBillingUpdateEmail: null,
                suspendPayments: null,
                taxNumber: null,
                tradingName: null,
                website: null
            },
            {
                headers: {
                    'X-API-Key': API_KEY,
                    Authorization: 'Bearer ' + window.localStorage.getItem('refreshToken')
                }
            }
        ).then(() => {
            getOrganisations().then((response) => {
                updateOrganisations(response.data.organisations)
                updateUser(response.data.user)
            })
        })
        onClose()
    }

    return (
        <Modal
            isOpen={isOpenBilling}
            onClose={onClose}
            size="xl"
        >
            <ModalOverlay />
            <ModalContent minW='800px'>
                <ModalHeader display='flex' alignItems='center' justifyContent='space-between'>
                    <Flex direction='row' flex='1'>
                        <Icon as={MdPerson} width='25px' height='25px' color='blue' mr='20px' />
                        <Text fontSize='2xl' fontWeight='700' color='black'>Edit Billing Address</Text>
                    </Flex>
                    <Flex align='center' justify='center' ml='30px' mt='-15px'>
                        <ModalCloseButton focused="false" position='relative' size="25px" />
                    </Flex>
                </ModalHeader>

                <ModalBody pb={6}>

                    <Flex direction='column'>
                        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='10px' mt='10px'>
                            <Flex direction='column'>
                                <Text fontSize='lg' fontWeight='700' mb='5px'>First Name</Text>

                                <Input
                                    defaultValue={firstName}

                                    variant='auth'
                                    fontSize='lg'
                                    ms={{ base: "0px", md: "0px" }}

                                    fontWeight='500'
                                />
                            </Flex>
                            <Flex direction='column'>
                                <Text fontSize='lg' fontWeight='700' mb='5px'>Last Name</Text>

                                <Input
                                    defaultValue={lastName}

                                    variant='auth'
                                    fontSize='lg'
                                    ms={{ base: "0px", md: "0px" }}

                                    fontWeight='500'
                                />
                            </Flex>

                        </SimpleGrid>
                        <Flex direction='column' w='100%'>
                            <Text fontSize='lg' fontWeight='700' mb='5px'>Address Line1*</Text>

                            <Input
                                defaultValue={address1}

                                variant='auth'
                                fontSize='lg'
                                ms={{ base: "0px", md: "0px" }}

                                fontWeight='500'
                            />
                        </Flex>

                        <Flex direction='column' w='100%'>
                            <Text fontSize='lg' fontWeight='700' mb='5px'>Address Line2</Text>

                            <Input
                                defaultValue={address2}

                                variant='auth'
                                fontSize='lg'
                                ms={{ base: "0px", md: "0px" }}

                                fontWeight='500'
                            />
                        </Flex>

                        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='10px' mt='10px'>
                            <Flex direction='column'>
                                <Text fontSize='lg' fontWeight='700' mb='5px'>Town/City*</Text>

                                <Input
                                    defaultValue={city}

                                    variant='auth'
                                    fontSize='lg'
                                    ms={{ base: "0px", md: "0px" }}

                                    fontWeight='500'
                                />
                            </Flex>
                            <Flex direction='column'>
                                <Text fontSize='lg' fontWeight='700' mb='5px'>Postcode/Zip*</Text>

                                <Input
                                    defaultValue={postcode}

                                    variant='auth'
                                    fontSize='lg'
                                    ms={{ base: "0px", md: "0px" }}

                                    fontWeight='500'
                                />
                            </Flex>

                        </SimpleGrid>
                        <Flex direction='column' w='100%'>
                            <Text fontSize='lg' fontWeight='700' mb='5px'>Registered Country*</Text>
                            <Flex align='center'>
                                <Image src={'https://portal.esim-go.com/assets/packages/intl_phone_number_input/assets/flags/' + country.toLowerCase() + '.png'} w='60px' h='40px' alt='flag' />
                                <Text ml='10px'>{country}</Text>
                            </Flex>
                        </Flex>
                    </Flex>

                </ModalBody>

                <ModalFooter>
                    <Button onClick={onClose}>CANCEL</Button>
                    <Button colorScheme='blue' ml={3} onClick={onSave}>
                        SAVE BILLING ADDRESS
                    </Button>

                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}