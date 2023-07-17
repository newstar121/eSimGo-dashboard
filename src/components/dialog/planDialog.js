import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Flex, Text, Button, useDisclosure, SimpleGrid, Input, Icon, Image, Avatar } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdDetails, MdSimCard } from "react-icons/md";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { useGlobalData } from "contexts/AppContext";

export const PlanDialog = ({ isOpen, handleClose, planData }) => {

    const [state] = useGlobalData()
    const countries = state?.countries || []

    const {
        isOpen: isOpenPlan,
        onOpen: onOpenPlan,
        onClose: onClosePlan,
    } = useDisclosure();

    useEffect(() => {
        if (isOpen) {
            onOpenPlan()
        } else {
            onClosePlan()
        }

    }, [isOpen])

    const [data, setData] = useState()

    useEffect(() => {
        setData(planData)

    }, [planData])

    const onClose = () => {
        handleClose()
        onClosePlan()
    }

    const [count, setCount] = useState(1)

    const onSave = () => {
        handleClose()
    }

    const renderSpeed = (speed) => {
        let result = ''
        if (speed) {
            result = speed.join('/')
        }
        return result;
    }

    const getCountryPrefix = (prefix) => {
        let findIndex = countries.findIndex((country) => country.name == prefix)
        if (findIndex > -1) {
            return countries[findIndex].iso.toLowerCase()
        } else {
            return '';
        }
    }

    return (
        <Modal
            isOpen={isOpenPlan}
            onClose={onClose}
            size="xl"
        >
            <ModalOverlay />


            <ModalContent minW='1000px'>
                <Flex w='100%'>
                    <Flex pt='10' pb='10' direction='column' justify='space-between' w='40%' backgroundImage={data?.imageUrl} backgroundRepeat='no-repeat' backgroundSize='cover'>
                        <Text color='white' fontSize='2xl' textAlign='center'>{data?.description}</Text>
                        <Flex direction='column'>
                            <Flex justify='space-around' w='100%' mb='10'>
                                <Text color='white' fontSize='2xl' textAlign='center'>{`${data?.dataAmount / 1000}GB`}</Text>
                                <Text color='white' fontSize='2xl' textAlign='center'>{`${data?.duration} days`}</Text>
                                <Text color='white' fontSize='2xl' textAlign='center'>{`${data?.roamingEnabled ? data?.roamingEnabled.length : 0} Countries`}</Text>
                            </Flex>
                            <Flex justify='space-around'>
                                <Text color='white' fontSize='2xl' textAlign='center'>{`${renderSpeed(data?.speed)} Data`}</Text>
                                <Text color='white' fontSize='2xl' textAlign='center'>{`${data?.autostart ? 'AutoStart Enabled' : 'AutoStart Disabled'}`}</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex direction='column' w='60%'>
                        <ModalHeader display='flex' alignItems='center' justifyContent='space-between'>
                            <Flex direction='row' flex='1'>

                                <Text fontSize='2xl' fontWeight='700' color='black'>Bundle Details</Text>
                            </Flex>
                            <Flex align='center' justify='center' ml='30px' mt='-15px'>
                                <ModalCloseButton focused="false" position='relative' size="25px" />
                            </Flex>
                        </ModalHeader>

                        <ModalBody pb={6}>

                            <Flex direction='column'>
                                <Text fontSize='lg' fontWeight='700' mb='5px'>{data?.description}</Text>
                                <Flex direction='column' mb='5' w='100%'>
                                    <Text fontSize='lg' fontWeight='700' mb='5px'>Base Country</Text>
                                    <Flex align='center'>
                                        <Avatar
                                            // src={'https://portal.esim-go.com/assets/packages/intl_phone_number_input/assets/flags/' + getCountryPrefix(data?.country) + '.svg'}
                                            src={'https://portal.esim-go.com/assets/packages/flag/res/1x1/' + getCountryPrefix(data?.country) + '.svg'}
                                            w='30px'
                                            h='30px'
                                            me='8px'
                                            name={getCountryPrefix(data?.country)}
                                        />

                                        <Text ml='10px'>{data?.country}</Text>
                                    </Flex>
                                </Flex>
                                <Text fontSize='lg' fontWeight='700' mb='5px'>Roaming Countries</Text>
                                <div>
                                    {data?.roamingEnabled?.sort((a, b) => a.name > b.name ? 1 : -1).map((country) => {
                                        return (
                                            <Avatar
                                                src={'https://portal.esim-go.com/assets/packages/flag/res/1x1/' + country.iso.toLowerCase() + '.svg'}
                                                w='30px'
                                                h='30px'
                                                m='1'
                                                name={country.iso.toLowerCase()}
                                            />)
                                    })}
                                </div>
                            </Flex>

                        </ModalBody>

                        <ModalFooter>
                            <Flex align='center'>
                                <Text fontWeight='700' fontSize='xl'>Qty</Text>
                                <Input
                                    value={count}
                                    fontSize='xl'
                                    type="number"
                                    ms={{ base: "0px", md: "0px" }}
                                    ml='10px'
                                    mr='10px'
                                    w='100px'
                                    onChange={(e) => { setCount(e.target.value) }}
                                    fontWeight='500'
                                />
                                <Text fontWeight='700' fontSize='xl'>{` per $${data?.company_price}`}</Text>
                            </Flex>
                            <Button colorScheme='blue' ml='5' onClick={onSave}>
                                ${(count * data?.company_price).toFixed(2) || 0}-ADD BUNDLE
                            </Button>

                        </ModalFooter>
                    </Flex>
                </Flex>


            </ModalContent>

        </Modal>
    )
}