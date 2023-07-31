import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Flex, Text, Button, useDisclosure, SimpleGrid, Input, Icon, Image } from "@chakra-ui/react";
import { useGlobalData } from "contexts/AppContext";
import { useEffect, useState } from "react";
import { MdPerson } from "react-icons/md";
import axios from "axios";
import { API_URL } from "utils/constant";
import { getOrganisations } from "contexts/AppContext";
import { API_KEY } from "utils/constant";
import { API_BACKEND_URL } from "utils/constant";

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
        if (organisations && organisations.length > 0) {
            return organisations[0]
        } else {
            return undefined
        }
        // let user = state?.user;
        // let userId = state?.user?.id;

        // let findIndex = organisations.findIndex((organisation) => {
        //     let findUserIndex = organisation.users.findIndex((user) => user.id === userId)
        //     return findUserIndex > -1;
        // })

        // if (findIndex > -1) {
        //     return organisations[findIndex]
        // } else {
        //     return undefined
        // }
    }

    const organisation = getOrganisation();
    const firstName = organisation?.billingFirstNames || ''
    const lastName = organisation?.billingSurname || ''
    const address1 = organisation?.billingAddr1 || ''
    const address2 = organisation?.billingAddr2 || ''
    const city = organisation?.billingCity || ''
    const postcode = organisation?.billingPostcode || ''
    const country = organisation?.country || ''

    const [_firstName, setFirstName] = useState()
    const [_lastName, setLastName] = useState()
    const [_address1, setAddress1] = useState()
    const [_address2, setAddress2] = useState()
    const [_city, setCity] = useState()
    const [_postcode, setPostCode] = useState()

    const onSave = () => {
        axios.post(
            API_BACKEND_URL + 'user/save_billing',
            {
                billingAddr1: _address1,
                billingAddr2: _address2,
                billingCity: _city,
                billingFirstNames: _firstName,
                billingPostcode: _postcode,
                billingSurname: _lastName,
            },
            {
                headers: {
                    Authorization: window.localStorage.getItem('token')
                }
            }
        ).then(() => {
            getOrganisations().then((response) => {
                updateOrganisations(response.data.organisations || [])
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
                                    value={_firstName ? _firstName : firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
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
                                    value={_lastName ? _lastName : lastName}
                                    onChange={(e) => setLastName(e.target.value)}
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
                                value={_address1 ? _address1 : address1}
                                onChange={(e) => setAddress1(e.target.value)}
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
                                value={_address2 ? _address2 : address2}
                                onChange={(e) => setAddress2(e.target.value)}
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
                                    value={_city ? _city : city}
                                    onChange={(e) => setCity(e.target.value)}
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
                                    value={_postcode ? _postcode : postcode}
                                    onChange={(e) => setPostCode(e.target.value)}
                                    variant='auth'
                                    fontSize='lg'
                                    ms={{ base: "0px", md: "0px" }}

                                    fontWeight='500'
                                />
                            </Flex>

                        </SimpleGrid>
                        <Flex direction='column' w='100%'>
                            <Text fontSize='lg' fontWeight='700' mb='5px'>Registered Country*</Text>
                            {country && country.length > 0 ? (
                                <Flex align='center'>
                                    <Image src={'https://portal.esim-go.com/assets/packages/intl_phone_number_input/assets/flags/' + country.toLowerCase() + '.png'} w='60px' h='40px' alt='flag' />
                                    <Text ml='10px'>{country}</Text>
                                </Flex>
                            ) : (<>
                            </>)}
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