// Chakra imports
import { Box, Flex, SimpleGrid, Text, Input, Image, Icon } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { API_URL } from "utils/constant";
import { API_KEY } from "utils/constant";
import { useGlobalData } from "contexts/AppContext";
import { Dropdown } from "semantic-ui-react";
import { MdAccountBalanceWallet } from "react-icons/md";
const columns = [
  {
    Header: "TYPE",
    accessor: "charge_type",
  },
  {
    Header: "ITEM",
    accessor: "item",
  },
  {
    Header: "TOTAL",
    accessor: "total",
  },
  {
    Header: "CURRENCY",
    accessor: "currency",
  },
  {
    Header: "STATUS",
    accessor: "status",
  },
  {
    Header: "REFERENCE",
    accessor: "charge_reference",
  },
  {
    Header: "CREATE DATE",
    accessor: "createDate",
  },
  {
    Header: "ASSIGNED",
    accessor: "assigned",
  },
  {
    Header: "ACTIONS",
    accessor: "action",
  },
];

export default function Payment() {

  const [state] = useGlobalData()

  const [country, setCountry] = useState('');
  const [countryInfo, setCountryInfo] = useState([])

  const getOrganization = () => {

    let organizations = state?.organizations || [];
    let user = state?.user;
    let userId = state?.user?.id;

    let findIndex = organizations.findIndex((organization) => {
      let findUserIndex = organization.users.findIndex((user) => user.id === userId)
      return findUserIndex > -1;
    })

    if (findIndex > -1) {
      return organizations[findIndex]
    } else {
      return {}
    }
  }

  const organization = getOrganization();
  const default_country = organization.country || ''
  const countries = state?.countries || {};
  
  const balance = organization.balance || 0;

  useEffect(() => {
    let result = []
    let keys = Object.keys(countries)

    for (let i = 0; i < keys.length; i++) {
      let key = keys[i].toLowerCase()
      // result.push(
      //   <option value={keys[i]} key={keys[i]}>
      //     <Flex align='center'>

      //       <Image src={'https://portal.esim-go.com/assets/packages/intl_phone_number_input/assets/flags/' + keys[i].toLowerCase() + '.png'} alt='flag' />
      //       {countries[keys[i]].toString()}
      //     </Flex>
      //   </option>
      // )

      result.push({
        key: key,
        value: key,
        flag: key,
        text: countries[keys[i]].toString()
      })
    }
    setCountryInfo(result);

  }, [countries])

  const handleCountry = (value) => {
    if (value !== country) setCountry(value)
  }

  // Chakra Color Mode
  return (
    <Box p={{ base: "20px", md: "25px", xl: "30px" }} pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Flex direction='column'>
        <Text fontSize='2xl' fontWeight='700' color='black' mb='10px'>Billing Management</Text>
        <Text fontSize='xl' fontWeight='600' color='secondaryGray.600' mb='10px'>Manage your Account's billing using the options below.</Text>

        <Text fontSize='xl' fontWeight='700' color='black'>Billing Setting</Text>
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='10px' mt='10px'>
          <Flex direction='column'>
            <Text fontSize='lg' fontWeight='700' mb='5px'>Country of Registration*</Text>
            {/* <Select
              onClick={(e) => handleCountry(e.target.value)}
              // defaultValue={default_country}
              value={country ? country : default_country}
            >
              {countryInfo}
            </Select> */}
            <Dropdown
              placeholder='Select Country'
              // fluid
              search
              selection
              value={country ? country : default_country}
              onClick={(e) => handleCountry(e.target.value)}
              options={countryInfo}
            />
          </Flex>
          <Flex justify='space-between'>
            <Flex direction='column' w='30%'>
              <Text fontSize='lg' fontWeight='700'>Country Code</Text>
              <Input
                defaultValue={''}

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
                defaultValue={''}

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
        <Flex border='1px' borderStyle='solid' borderRadius='10px' align='center' p='20px'>
          <Icon as={MdAccountBalanceWallet} width='25px' height='25px' color='blue' mr='20px'/>
          <Text fontWeight='700' fontSize='2xl'>Your Account Balance is </Text>
          <Text fontWeight='700' fontSize='2xl' color='green'>${balance}</Text>
        </Flex>
        <Text fontSize='xl' fontWeight='700' color='black'>Saved Billing Address</Text>

        {/* <Text fontSize='xl' fontWeight='700' color='black'>Auto Top Up Setting</Text> */}

        {/* <Text fontSize='xl' fontWeight='700' color='black'>Billing Setting</Text> */}
      </Flex>
    </Box>
  );
}
