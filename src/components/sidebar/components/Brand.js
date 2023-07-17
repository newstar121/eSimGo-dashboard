import React from "react";

// Chakra imports
import { Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";

// Custom components
// import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";
import {
  MdApartment, MdSettings, MdAccountBalanceWallet,
} from "react-icons/md";
import { useHistory } from 'react-router-dom'
import { useGlobalData } from "contexts/AppContext";

export function SidebarBrand() {
  //   Chakra color mode
  // let logoColor = useColorModeValue("navy.700", "white");

  const history = useHistory()

  const [state] = useGlobalData()

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
  
  const user = state?.user || ''
  const fullName = user ? user?.firstName + ' ' + user?.lastName : '';

  const balance = organisation?.balance.toFixed(2) || 0;

  return (
    <Flex align='center' direction='column'>

      <Flex align='center' justify='space-around' direction='row' w='100%'>
        <Icon as={MdApartment} width='25px' height='25px' color='inherit' />
        <Flex align='center' direction='column'>
          <Text fontSize='2xl' fontWeight='bold'>{fullName}</Text>
          <Flex align='center' direction='row'>
            <Icon as={MdAccountBalanceWallet} width='25px' height='25px' color='inherit' />
            <Text fontSize='2xl'>${balance}</Text>
          </Flex>
        </Flex>
        <Icon as={MdSettings} width='25px' height='25px' color='inherit' className="icon-hover" onClick={() => { history.push('/admin/profile') }} />
      </Flex>
      <HSeparator mb='20px' mt='10px' />
    </Flex>
  );
}

export default SidebarBrand;
