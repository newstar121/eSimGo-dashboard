/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdCalendarMonth,
  MdFileCopy,
  MdTrendingDown,
  MdTrendingUp,
} from "react-icons/md";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";

export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 3 }}
        gap='20px'
        mb='20px'>
        {/* Bundle Sold in last...*/}
        <MiniStatistics
        fontSize='10px'
          endContent={
            <Flex me='0px' mt='15px' align='center'>
              <MdCalendarMonth size={30} color="blue"></MdCalendarMonth>
            </Flex>
          }
          name={
            <Flex align='center' direction='row'>
              <Text fontSize='2xl' fontWeight='bold' color='green'>3</Text>
              <Flex border='1px' borderColor='green' padding='4px' ml='10px' borderRadius='5px'>
                <MdTrendingUp color="green" fontWeight='bold'></MdTrendingUp>
                <Text fontSize='md' color='green'>100%</Text>
              </Flex>
            </Flex>
          }
          value='Bundles Sold in last...'
        />
        {/* Total eSIMs Produced */}
        <MiniStatistics
          // endContent={
          //   <Flex me='0px' mt='15px' align='center'>
          //     <MdCalendarMonth size={30} color="blue"></MdCalendarMonth>
          //   </Flex>
          // }
          name={
            <Flex align='center' direction='row'>
              <Text fontSize='2xl' fontWeight='bold' color='green'>6</Text>
              <Flex border='1px' borderColor='green' padding='4px' ml='10px' borderRadius='5px'>
                <MdTrendingUp color="green" fontWeight='bold'></MdTrendingUp>
                <Text fontSize='md' color='green'>100%</Text>
              </Flex>
            </Flex>
          }
          value='Total eSIMs Produced'
        />
        {/* eSIMs Produced this... */}
        <MiniStatistics
          // endContent={
          //   <Flex me='0px' mt='15px' align='center'>
          //     <MdCalendarMonth size={30} color="blue"></MdCalendarMonth>
          //   </Flex>
          // }
          name={
            <Flex align='center' direction='row'>
              <Text fontSize='2xl' fontWeight='bold' color='green'>6</Text>
              <Flex border='1px' borderColor='green' padding='4px' ml='10px' borderRadius='5px'>
                <MdTrendingUp color="green" fontWeight='bold'></MdTrendingUp>
                <Text fontSize='md' color='green'>100%</Text>
              </Flex>
            </Flex>
          }
          value='eSIMs Produced this...'
        />
        {/* Bundles in inventory */}
        <MiniStatistics
          // endContent={
          //   <Flex me='0px' mt='15px' align='center'>
          //     <MdCalendarMonth size={30} color="blue"></MdCalendarMonth>
          //   </Flex>
          // }
          name={
            <Flex align='center' direction='row'>
              <Text fontSize='2xl' fontWeight='bold' color='green'>0</Text>
              {/* <Flex border='1px' borderColor='green' padding='4px' ml='10px' borderRadius='5px'>
                <MdTrendingUp color="green" fontWeight='bold'></MdTrendingUp>
                <Text fontSize='md' color='green'>100%</Text>
              </Flex> */}
            </Flex>
          }
          value='Bundles in inventory'
        />
        {/* Top-Up Bundles applied */}
        <MiniStatistics
          // endContent={
          //   <Flex me='0px' mt='15px' align='center'>
          //     <MdCalendarMonth size={30} color="blue"></MdCalendarMonth>
          //   </Flex>
          // }
          name={
            <Flex align='center' direction='row'>
              <Text fontSize='2xl' fontWeight='bold' color='green'>0</Text>
              <Flex border='1px' borderColor='green' padding='4px' ml='10px' borderRadius='5px'>
                <MdTrendingDown color="green" fontWeight='bold'></MdTrendingDown>
                <Text fontSize='md' color='green'>0%</Text>
              </Flex>
            </Flex>
          }
          value='Top-Up Bundles applied...'
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <TotalSpent />
        <WeeklyRevenue />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          <DailyTraffic />
          <PieCard />
        </SimpleGrid>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          <Tasks />
          <MiniCalendar h='100%' minW='100%' selectRange={false} />
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
}
