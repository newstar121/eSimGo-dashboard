// Chakra imports
import { Box, Flex, SimpleGrid, Text, Input, Image, Icon, Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useGlobalData } from "contexts/AppContext";
import { MdAccountBalanceWallet, MdMap } from "react-icons/md";
import { TopUpDialog } from "components/dialog/topUpDialog";
import { BillingDialog } from "components/dialog/billingDialog"
import { CountrySelect } from "components/selectOptions/country.component";
import axios from "axios";
import { API_BACKEND_URL } from "utils/constant";

export default function Payment() {

  const [state] = useGlobalData()

  const [country, setCountry] = useState();

  const onSelect = (country) => setCountry(country);

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
    //   let findUserIndex = organisation.users.findIndex((user) => user.id === userId)
    //   return findUserIndex > -1;
    // })

    // if (findIndex > -1) {
    //   return organisations[findIndex]
    // } else {
    //   return undefined
    // }
  }

  const organisation = getOrganisation();

  const default_country = organisation?.country || ''

  const balance = organisation?.balance || 0;
  const billingName = organisation ? ((organisation?.billingFirstNames || '') + ' ' + (organisation?.billingSurname || '')) : 'Set your billing address';
  const billingContentStr = organisation ? (organisation?.billingAddr1 || '') + ', ' + (organisation?.billingAddr2 || '')
    + ', ' + (organisation?.billingCity || '') + ', ' + (organisation?.billingPostcode || '')
    + ', ' + (organisation?.billingState || '') + ', ' + (organisation?.registeredCountry || '') : '';
  const billingContent = billingContentStr.replace(/,\s,/g, ",") || ''
  const countryCode = organisation?.country || '';
  const vatNo = organisation?.taxNumber?.substring(countryCode.length)

  const handleSave = () => {
    // axios.post(
    //   API_BACKEND_URL, + 'user/'
    // )
  }

  const [isOpenTopUp, setOpenTopUp] = useState(false)
  const [isOpenBilling, setOpenBilling] = useState(false)

  const handleTopUp = () => {
    setOpenTopUp(true)
  }

  const handleBilling = () => {
    setOpenBilling(true)
  }

  // Chakra Color Mode
  return (
    <>
      <TopUpDialog
        isOpen={isOpenTopUp}
        handleClose={() => { setOpenTopUp(false) }}
      />

      <BillingDialog
        isOpen={isOpenBilling}
        handleClose={() => { setOpenBilling(false) }}
      />

      <Box p={{ base: "20px", md: "25px", xl: "30px" }} pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <Flex direction='column'>
          <Text fontSize='2xl' fontWeight='700' color='black' mb='10px'>Billing Management</Text>
          <Text fontSize='xl' fontWeight='600' color='secondaryGray.600' mb='10px'>Manage your Account's billing using the options below.</Text>

          <Text fontSize='xl' fontWeight='700' color='black'>Billing Setting</Text>
          <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='10px' mt='10px'>
            <Flex direction='column'>
              <Text fontSize='lg' fontWeight='700' mb='5px'>Country of Registration*</Text>

              <CountrySelect
                select={country ? country : (default_country ? default_country : '')}
                onSelect={onSelect}
              />

            </Flex>
            <Flex justify='space-between'>
              <Flex direction='column' w='30%'>
                <Text fontSize='lg' fontWeight='700'>Country Code</Text>
                <Input
                  defaultValue={countryCode}

                  variant='auth'
                  fontSize='lg'
                  ms={{ base: "0px", md: "0px" }}
                  mt='7px'
                  fontWeight='500'
                />
              </Flex>
              <Flex direction='column' w='65%'>
                <Text fontSize='lg' fontWeight='700'>Vat No.</Text>
                <Input
                  defaultValue={vatNo}

                  variant='auth'
                  fontSize='lg'
                  mt='7px'
                  ms={{ base: "0px", md: "0px" }}
                  fontWeight='500'
                />
              </Flex>
            </Flex>

          </SimpleGrid>

          <Text fontSize='xl' fontWeight='700' color='black'>Current Balance</Text>
          <Flex border='1px' borderStyle='solid' borderRadius='10px' align='center' justify='space-between' p='20px' mt='10px'>
            <Flex align='center'>
              <Icon as={MdAccountBalanceWallet} width='25px' height='25px' color='blue' mr='20px' />
              <Text fontWeight='700' fontSize='xl' mr='10px'>Your Account Balance is </Text>
              <Text fontWeight='700' fontSize='xl' color='green'>${balance}</Text>
            </Flex>
            <Text fontWeight='700' fontSize='2xl' color='blue' mr='10px' onClick={handleTopUp} className="icon-hover">TOP UP</Text>
          </Flex>

          <Text fontSize='xl' fontWeight='700' color='black' mt='20px'>Saved Billing Address</Text>
          <Flex border='1px' borderStyle='solid' borderRadius='10px' align='center' justify='space-between' p='20px' mt='10px'>
            <Flex align='center'>
              <Icon as={MdMap} width='25px' height='25px' color='blue' mr='20px' />
              <Flex direction='column'>
                <Text fontWeight='700' fontSize='xl' mr='10px'>{billingName}</Text>
                <Text fontWeight='700' fontSize='xl' color='secondaryGray.500'>{billingContent}</Text>
              </Flex>
            </Flex>
            <Text fontWeight='700' fontSize='2xl' color='blue' mr='10px' onClick={handleBilling} className="icon-hover">CHANGE</Text>
          </Flex>

          {/* <Text fontSize='xl' fontWeight='700' color='black'>Auto Top Up Setting</Text> */}

          {/* <Text fontSize='xl' fontWeight='700' color='black'>Billing Setting</Text> */}

          <Flex align='center' justify='center' w='100%' mt='30px'>
            <Button colorScheme='blue' size="lg" onClick={handleSave}>
              Save Changes
            </Button>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
