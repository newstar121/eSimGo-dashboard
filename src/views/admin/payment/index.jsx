// Chakra imports
import { Box, Flex, SimpleGrid, Text, Select, Input } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { API_URL } from "utils/constant";
import { API_KEY } from "utils/constant";

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

export default function Settings() {

  const [chargeData, setChargeData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [myData, setMyData] = React.useState([]);

  const inputProps = {
    inputStyle: 'box',
    labelStyle: 'stacked',
    placeholder: 'Please select...'
  };

  useEffect(() => {

    axios.get('https://trial.mobiscroll.com/content/countries.json', (resp) => {
      const countries = [];
      for (let i = 0; i < resp.length; ++i) {
        const country = resp[i];
        countries.push({ text: country.text, value: country.value });
      }
      setMyData(countries);
    });
  }, [])

  const renderCustomItem = (item) => {
    return <div className="md-country-picker-item">
      <img className="md-country-picker-flag" src={'https://img.mobiscroll.com/demos/flags/' + item.data.value + '.png'} alt="Flag" />
      {item.display}
    </div>;
  }

  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Flex direction='column'>
        <Text fontSize='lg' fontWeight='700' color='black'>Billing Management</Text>
        <Text fontSize='md' fontWeight='600' color='secondaryGray.600'>Manage your Account's billing using the options below.</Text>

        <Text fontSize='md' fontWeight='700' color='black'>Billing Setting</Text>\
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
          <Flex direction='column'>
            <Text fontSize='sm' fontFamily='700'>Country of Registration*</Text>
            <Select
              data={myData}
              label="Countries"
              inputProps={inputProps}
              display="anchored"
              itemHeight={40}
              renderItem={renderCustomItem}
            />
          </Flex>
          <Flex justify='space-between'>
            <Flex direction='column' w='30%'>
              <Text fontSize='sm' fontFamily='700'>Country of Registration*</Text>
              <Input
                value={''}

                variant='auth'
                fontSize='lg'
                ms={{ base: "0px", md: "0px" }}
                fontWeight='500'
              />
            </Flex>
            <Flex direction='column' w='65%'>
              <Text fontSize='sm' fontFamily='700'>Country of Registration*</Text>
              <Input
                value={''}

                variant='auth'
                fontSize='lg'
                ms={{ base: "0px", md: "0px" }}
                fontWeight='500'
              />
            </Flex>
          </Flex>

        </SimpleGrid>
      </Flex>
    </Box>
  );
}
