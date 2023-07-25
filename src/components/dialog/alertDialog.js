import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Flex, Text, Button, useDisclosure, SimpleGrid, Input, Icon, Image, Checkbox } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdInfo, MdPerson } from "react-icons/md";

export const AlertDialog = ({ isOpen, handleClose }) => {

    const {
        isOpen: isOpenAlert,
        onOpen: onOpenAlert,
        onClose: onCloseAlert,
    } = useDisclosure();

    const [check, setCheck] = useState(false)

    useEffect(() => {
        if (isOpen) {
            onOpenAlert()
        } else {
            onCloseAlert()
        }
    }, [isOpen])

    const onClose = () => {
        window.localStorage.setItem('display-time', (new Date()).getTime())
        handleClose()
        onCloseAlert()
    }

    const handleShow = (check) => {
        setCheck(check)
    }

    const DialogData = {
        header: 'Bundle Validity Period & eSIM Top-Ups',
        body1: `Once purchased a data bundle remains available to use as a top-up or on a new eSIM for 12 months.\n   
                The data bundle validity period (7 or 30 days) starts once the first 1 kb of data is used.\n`,
        body2: `An eSIM can be reused and topped up again up to 12 months after the last used date.\n
                After that date the eSIM will expire and the end-user will require a new one.\n`
    }

    return (
        <Modal
            isOpen={isOpenAlert}
            onClose={onClose}
            size="xl"
        >
            <ModalOverlay />
            <ModalContent minW='800px'>
                <ModalHeader display='flex' alignItems='center' justifyContent='space-between'>

                    <Flex direction='row' flex='1'>
                        <Icon as={MdInfo} width='25px' height='25px' color='blue' mr='20px' />
                        <Text fontSize='2xl' fontWeight='700' color='black'>{DialogData.header}</Text>
                    </Flex>
                    <Flex align='center' justify='center' ml='30px' mt='-15px'>
                        <ModalCloseButton focused="false" position='relative' size="25px" />
                    </Flex>

                </ModalHeader>

                <ModalBody pb={6}>
                    <Flex direction='column'>
                        <Text fontSize='xl' fontWeight='700' color='black' p={10}>{DialogData.body1}</Text>
                        <Text fontSize='xl' fontWeight='700' color='black' p={10}>{DialogData.body2}</Text>
                    </Flex>

                </ModalBody>

                <ModalFooter>

                    <Checkbox value={check} onClick={(e) => handleShow(e.target.checked)}></Checkbox>
                    <Text fontSize='lg' fontWeight='700' color='black' ml={5}>Don't show for one day.</Text>

                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}