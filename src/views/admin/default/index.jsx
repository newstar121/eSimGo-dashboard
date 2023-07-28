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
import axios from "axios";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React, { useEffect, useState } from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdCalendarMonth,
  MdEventRepeat,
  MdFileCopy,
  MdTrendingDown,
  MdTrendingUp,
} from "react-icons/md";
import { API_URL, API_KEY } from "utils/constant";
import TopBundleTable from "views/admin/default/components/TopBundleTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import CostOfBundle from "views/admin/default/components/CostOfBundle";
import { getTotalBundlesSold, getOrganisations } from "contexts/AppContext";
import { useGlobalData } from "contexts/AppContext";

const columns = [
  {
    Header: "Content",
    accessor: "bundleAlias",
  },
  {
    Header: "Count",
    accessor: "bundlesSold",
  }
]

export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  const [showTotalBundle, setShowTotalBundle] = useState(true)

  // const [totalCostOfBundles, setTotalCostOfBundles] = useState([])
  // const [totalCostOfNewEsims, setTotalCostOfNewEsims] = useState([])
  // const [totalCostOfExistingEsims, setTotalCostOfExistingEsims] = useState([])

  const [totalEsims, setTotalEsims] = useState(0)
  const [totalEsimsWithBundlesApplied, setTotalEsimsWithBundlesApplied] = useState(0)
  const [percentageDifference1, setPercentageDifference1] = useState(0)

  const [totalEsimsTM, setTotalEsimsTM] = useState(0)
  const [totalEsimsWithBundlesAppliedTM, setTotalEsimsWithBundlesAppliedTM] = useState(0)
  const [percentageDifferenceTM1, setPercentageDifferenceTM1] = useState(0)

  const [totalBundles, setTotalBundles] = useState(0)
  const [totalUnassignedBundles, setTotalUnassignedBundles] = useState(0)

  const [thisPeriodTopUps, setThisPeriodTopUps] = useState(0)
  const [previousPeriodTopUps, setPreviousPeriodTopUps] = useState(0)
  const [percentageDifferenceAll, setPercentageDifferenceAll] = useState(0)
  const [thisPeriodTopUpsAtLeastOneApply, setThisPeriodTopUpsAtLeastOneApply] = useState(0)
  const [previousPeriodTopUpsAtLeastOneApply, setPreviousPeriodTopUpsAtLeastOneApply] = useState(0)
  const [percentageDifferenceAtLeastOneApply, setPercentageDifferenceAtLeastOneApply] = useState(0)

  const [thisPeriodBundlesSold, setThisPeriodBundlesSold] = useState([])
  const [previousPeriodBundlesSold, setPreviousPeriodBundlesSold] = useState([])

  const [state, { updateTotalBundlesSold, updateOrganisations, updateUser }] = useGlobalData();

  const thisPeriodTotalBundlesSold = state?.totalBundlesSold?.thisPeriodTotalBundlesSold || 0;
  const percentageDifference = state?.totalBundlesSold?.percentageDifference || 0;


  // COST OF BUNDLES PER MONTH
  // const getCostOfBundlesPerMonth = () => {
  //   axios.post(
  //     API_URL + 'dashboard/charts', {
  //     "filterBy": "",
  //     "monthEnd": null,
  //     "monthStart": null,
  //     "subType": null,
  //     "type": "costOfBundlesPerMonth"
  //   }, {
  //     headers: {
  //       'X-API-Key': API_KEY,
  //       Authorization: 'Bearer ' + window.localStorage.getItem('refreshToken')
  //     }
  //   }).then(function (response) {
  //     setTotalCostOfBundles(response.data.totalCostOfBundles)
  //     setTotalCostOfNewEsims(response.data.totalCostOfNewEsims)
  //     setTotalCostOfExistingEsims(response.data.totalCostOfExistingEsims)
  //   }).catch(function (error) {
  //     console.log(error);
  //   });
  // }

  // TOTAL ESIMS PRODUCED
  const getTotalEsimsProduced = (filterBy = null) => {
    axios.post(
      API_URL + 'dashboard/charts', {
      "filterBy": filterBy,
      "monthEnd": null,
      "monthStart": null,
      "subType": null,
      "type": "totalEsimsProduced"
    }, {
      headers: {
        'X-API-Key': API_KEY,
        Authorization: 'Bearer ' + window.localStorage.getItem('refreshToken')
      }
    }).then(function (response) {
      if (filterBy === 'CalendarMonth') {
        setTotalEsimsTM(response.data.totalEsims)
        setTotalEsimsWithBundlesAppliedTM(response.data.totalEsimsWithBundlesApplied)
        setPercentageDifferenceTM1(response.data.percentageDifference.toFixed(0))
      } else {
        setTotalEsims(response.data.totalEsims)
        setTotalEsimsWithBundlesApplied(response.data.totalEsimsWithBundlesApplied)
        setPercentageDifference1(response.data.percentageDifference.toFixed(0))
      }

    }).catch(function (error) {
      console.log(error);
    });
  }

  // TOTAL BUNDLS
  const getTotalBundles = () => {
    axios.post(
      API_URL + 'dashboard/charts', {
      "filterBy": null,
      "monthEnd": null,
      "monthStart": null,
      "subType": null,
      "type": "totalBundles"
    }, {
      headers: {
        'X-API-Key': API_KEY,
        Authorization: 'Bearer ' + window.localStorage.getItem('refreshToken')
      }
    }).then(function (response) {
      setTotalBundles(response.data.totalBundles)
      setTotalUnassignedBundles(response.data.totalUnassignedBundles)
    }).catch(function (error) {
      console.log(error);
    });
  }

  // TOP UPS
  const getTopUps = () => {
    axios.post(
      API_URL + 'dashboard/charts', {
      "filterBy": null,
      "monthEnd": null,
      "monthStart": null,
      "subType": null,
      "type": "topUps"
    }, {
      headers: {
        'X-API-Key': API_KEY,
        Authorization: 'Bearer ' + window.localStorage.getItem('refreshToken')
      }
    }).then(function (response) {
      setThisPeriodTopUps(response.data.thisPeriodTopUps)
      setPreviousPeriodTopUps(response.data.previousPeriodTopUps)
      setPercentageDifferenceAll(response.data.percentageDifferenceAll)
      setThisPeriodTopUpsAtLeastOneApply(response.data.thisPeriodTopUpsAtLeastOneApply)
      setPreviousPeriodTopUpsAtLeastOneApply(response.data.previousPeriodTopUpsAtLeastOneApply)
      setPercentageDifferenceAtLeastOneApply(response.data.percentageDifferenceAtLeastOneApply)
    }).catch(function (error) {
      console.log(error);
    });
  }

  // BUNDLES SOLD BY COUNTRY
  const getBundlesSoldByCountry = (filterBy = null) => {
    axios.post(
      API_URL + 'dashboard/charts', {
      "filterBy": filterBy,
      "monthEnd": null,
      "monthStart": null,
      "subType": "bundles",
      "type": "bundlesSoldByCountry"
    }, {
      headers: {
        'X-API-Key': API_KEY,
        Authorization: 'Bearer ' + window.localStorage.getItem('refreshToken')
      }
    }).then(function (response) {
      setThisPeriodBundlesSold(response.data.thisPeriodBundlesSold)
      setPreviousPeriodBundlesSold(response.data.previousPeriodBundlesSold)
    }).catch(function (error) {
      console.log(error);
    });
  }

  useEffect(() => {

    // TOTAL BUNDLES SOLD
    getTotalBundlesSold().then((result) => {
      updateTotalBundlesSold(result)
    });

    // COST OF BUNDLES PER MONTH
    // getCostOfBundlesPerMonth()

    // TOTAL ESIMS PRODUCED
    getTotalEsimsProduced()

    // THIS MONTH ESIMS PRODUCED
    getTotalEsimsProduced("CalendarMonth")

    // TOTAL BUNDLS
    getTotalBundles()

    // TOP UPS
    getTopUps()

    // BUNDLES SOLD BY COUNTRY
    getBundlesSoldByCountry("CalendarMonth")

    // BUNDLES PURCHASED BY REGION
    // getBundlesPurchasedByRegion()

    getOrganisations().then((response) => {
      updateOrganisations(response?.data?.organisations || [])
      updateUser(response.data.user)
    })

  }, [])

  const handleShowBundle = (value) => {
    setShowTotalBundle(value)
    if (value === true) {
      getTotalBundlesSold().then((result) => {
        updateTotalBundlesSold(result)
      });
    } else {
      getTotalBundlesSold("CalendarMonth").then((result) => {
        updateTotalBundlesSold(result)
      });
    }
  }

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        gap='20px'
        mb='20px'>
        {/* Bundle Sold in last...*/}
        <MiniStatistics
          fontSize='10px'
          endContent={
            <Flex me='0px' mt='15px' align='center'>
              {showTotalBundle ? (
                <MdCalendarMonth onClick={() => { handleShowBundle(false) }} size={30} color="blue" className="icon-hover"></MdCalendarMonth>
              ) : (
                <MdEventRepeat onClick={() => { handleShowBundle(true) }} size={30} color="blue" className="icon-hover"></MdEventRepeat>
              )}
            </Flex>
          }
          name={
            <Flex align='center' direction='row'>
              {percentageDifference >= 0 ? (
                <Text fontSize='2xl' fontWeight='bold' color='green'>{thisPeriodTotalBundlesSold}</Text>
              ) : (
                <Text fontSize='2xl' fontWeight='bold' color='red'>{thisPeriodTotalBundlesSold}</Text>
              )}
              {thisPeriodTotalBundlesSold == 0 ? (
                <></>
              ) : (
                <Flex border='1px' borderColor='green' padding='4px' ml='10px' borderRadius='5px'>
                  {percentageDifference >= 0 ? (
                    <>
                      <MdTrendingUp color="green" fontWeight='bold'></MdTrendingUp>
                      <Text fontSize='md' color='green'>{percentageDifference}%</Text>
                    </>
                  ) : (
                    <>
                      <MdTrendingDown color="red" fontWeight='bold'></MdTrendingDown>
                      <Text fontSize='md' color='red'>{percentageDifference}%</Text>
                    </>
                  )}

                </Flex>
              )}
            </Flex>
          }
          value={showTotalBundle ? 'Bundles Sold in last...' : 'Bundles Sold in this...'}
          className="overflow-ellipsis"

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
              {
                percentageDifference1 >= 0 ? (
                  <>
                    <Text fontSize='2xl' fontWeight='bold' color='green'>{totalEsims}</Text>
                    {totalEsims == 0 ? (
                      <></>
                    ) : (
                      <Flex border='1px' borderColor='green' padding='4px' ml='10px' borderRadius='5px'>
                        <MdTrendingUp color="green" fontWeight='bold'></MdTrendingUp>
                        <Text fontSize='md' color='green'>{percentageDifference1}%</Text>
                      </Flex>
                    )}
                  </>
                ) : (
                  <>
                    <Text fontSize='2xl' fontWeight='bold' color='red'>{totalEsims}</Text>
                    {totalEsims == 0 ? (
                      <></>
                    ) : (
                      <Flex border='1px' borderColor='red' padding='4px' ml='10px' borderRadius='5px'>
                        <MdTrendingUp color="red" fontWeight='bold'></MdTrendingUp>
                        <Text fontSize='md' color='red'>{percentageDifference1}%</Text>
                      </Flex>
                    )}
                  </>
                )
              }
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
              {
                percentageDifference1 >= 0 ? (
                  <>
                    <Text fontSize='2xl' fontWeight='bold' color='green'>{totalEsimsTM}</Text>
                    {totalEsimsTM == 0 ? (
                      <></>
                    ) : (
                      <Flex border='1px' borderColor='green' padding='4px' ml='10px' borderRadius='5px'>
                        <MdTrendingUp color="green" fontWeight='bold'></MdTrendingUp>
                        <Text fontSize='md' color='green'>{percentageDifferenceTM1}%</Text>
                      </Flex>
                    )}
                  </>
                ) : (
                  <>
                    <Text fontSize='2xl' fontWeight='bold' color='red'>{totalEsimsTM}</Text>
                    {totalEsimsTM == 0 ? (
                      <></>
                    ) : (
                      <Flex border='1px' borderColor='red' padding='4px' ml='10px' borderRadius='5px'>
                        <MdTrendingUp color="red" fontWeight='bold'></MdTrendingUp>
                        <Text fontSize='md' color='red'>{percentageDifferenceTM1}%</Text>
                      </Flex>
                    )}
                  </>
                )
              }
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
              <Text fontSize='2xl' fontWeight='bold' color='green'>{totalBundles}</Text>
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
              <Text fontSize='2xl' fontWeight='bold' color='green'>{thisPeriodTopUps}</Text>
              {thisPeriodTopUps == 0 ? (
                <></>
              ) : (
                percentageDifferenceAll >= 0 ? (
                  <>
                    <Flex border='1px' borderColor='green' padding='4px' ml='10px' borderRadius='5px'>
                      <MdTrendingDown color="green" fontWeight='bold'></MdTrendingDown>
                      <Text fontSize='md' color='green'>{percentageDifferenceAll}%</Text>
                    </Flex>
                  </>
                ) : (
                  <>
                    <Flex border='1px' borderColor='red' padding='4px' ml='10px' borderRadius='5px'>
                      <MdTrendingDown color="red" fontWeight='bold'></MdTrendingDown>
                      <Text fontSize='md' color='red'>{percentageDifferenceAll}%</Text>
                    </Flex>
                  </>
                )

              )}
            </Flex>
          }
          value='Top-Up Bundles applied...'
        />
      </SimpleGrid>

      {/* <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <TotalSpent />
        <WeeklyRevenue />
      </SimpleGrid> */}
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        {/* <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'> */}
        <DailyTraffic />
        <TopBundleTable
          columnsData={columns}
          tableData={thisPeriodBundlesSold}
        />
        {/* </SimpleGrid> */}
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <CostOfBundle />
        <PieCard />
      </SimpleGrid>
    </Box>
  );
}
