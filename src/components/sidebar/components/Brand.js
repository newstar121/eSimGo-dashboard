import React from "react";

// Chakra imports
import { Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";

// Custom components
// import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";
import {
  MdApartment, MdSettings, MdAccountBalanceWallet,
} from "react-icons/md";

export function SidebarBrand() {
  //   Chakra color mode
  // let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>

      <Flex align='center' justify='space-around' direction='row' w='100%'>
        <Icon as={MdApartment} width='25px' height='25px' color='inherit' />
        <Flex align='center' direction='column'>
          <Text fontSize='2xl' fontWeight='bold'>Clowdnet Service</Text>
          <Flex align='center' direction='row'>
            <Icon as={MdAccountBalanceWallet} width='25px' height='25px' color='inherit' />
            <Text fontSize='2xl'>${175}</Text>
          </Flex>
        </Flex>
        <Icon as={MdSettings} width='25px' height='25px' color='inherit' />
      </Flex>
      <HSeparator mb='20px' mt='10px' />
    </Flex>
  );
}

export default SidebarBrand;
