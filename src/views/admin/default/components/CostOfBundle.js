// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
// Custom components
import Card from "components/card/Card.js";
import LineChart from "components/charts/LineChart";
import React, { useEffect, useRef, useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdBarChart, MdFilterAlt, MdOutlineCalendarToday } from "react-icons/md";
// Assets
import { RiArrowUpSFill } from "react-icons/ri";
import { REGION_TYPE_NAME } from "utils/constant";
import { DISPLAY_TYPE_NAME } from "utils/constant";
import { DISPLAY_TYPE } from "utils/constant";
import { REGION_TYPE } from "utils/constant";
import { API_URL } from "utils/constant";
import { API_KEY } from "utils/constant";
// import {
//   lineChartDataTotalSpent,
//   lineChartOptionsTotalSpent,
// } from "variables/charts";

export default function CostOfBundle(props) {
  const { ...rest } = props;

  // Chakra Color Mode

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const iconColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );

  const [totalCostOfBundles, setTotalCostOfBundles] = useState([])
  const [totalCostOfNewEsims, setTotalCostOfNewEsims] = useState([])
  const [totalCostOfExistingEsims, setTotalCostOfExistingEsims] = useState([])

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [displayType, setDisplayType] = useState(DISPLAY_TYPE.cost)
  const [regionType, setRegionType] = useState(REGION_TYPE.all)

  const [data, setData] = useState([])
  const [category, setCategory] = useState([])

  // COST OF BUNDLES PER MONTH
  const getCostOfBundlesPerMonth = (filterBy = "") => {
    axios.post(
      API_URL + 'dashboard/charts', {
      "filterBy": filterBy,
      "monthEnd": null,
      "monthStart": null,
      "subType": null,
      "type": "costOfBundlesPerMonth"
    }, {
      headers: {
        'X-API-Key': API_KEY,
        Authorization: 'Bearer ' + window.localStorage.getItem('refreshToken')
      }
    }).then(function (response) {

      setTotalCostOfBundles(response.data.totalCostOfBundles)
      setTotalCostOfNewEsims(response.data.totalCostOfNewEsims)
      setTotalCostOfExistingEsims(response.data.totalCostOfExistingEsims)

    }).catch(function (error) {
      console.log(error);
    });
  }

  useEffect(() => {
    getCostOfBundlesPerMonth(regionType == 'all' ? "" : REGION_TYPE_NAME[regionType])
  }, [regionType])

  useEffect(() => {
    let tmpData = []
    let tmpCategory = []

    let costs = []

    // totalCostOfBundles
    totalCostOfBundles && totalCostOfBundles.forEach((item) => {
      costs.push(displayType == DISPLAY_TYPE.cost ? item.cost : item.count)
      tmpCategory.push(item.month)
    })

    tmpData.push({
      name: 'Bundles Purchased',
      data: costs
    })

    costs = []
    // totalCostOfNewEsims
    totalCostOfNewEsims && totalCostOfNewEsims.forEach((item) => {
      costs.push(displayType == DISPLAY_TYPE.cost ? item.cost : item.count)
    })

    tmpData.push({
      name: 'New eSIMs Created',
      data: costs
    })

    costs = []
    // totalCostOfExistingEsims
    totalCostOfExistingEsims && totalCostOfExistingEsims.forEach((item) => {
      costs.push(displayType == DISPLAY_TYPE.cost ? item.cost : item.count)
    })

    tmpData.push({
      name: 'Top-Ups Applied',
      data: costs
    })

    setData(tmpData)
    setCategory(tmpCategory)

  }, [displayType, totalCostOfBundles, totalCostOfNewEsims, totalCostOfExistingEsims])

  const handleModal = () => {
    onOpen()
  }

  const handleFilter = () => {
    onClose()
  }

  const handleRegionType = (type) => {
    if (regionType !== type) setRegionType(type)
  }

  const handleDisplayType = (type) => {
    if (displayType !== type) setDisplayType(type)
  }

  const renderDispayOptions = () => {
    let result = []
    Object.keys(DISPLAY_TYPE).forEach((type) => {
      result.push(
        <option value={type} key={type}>{DISPLAY_TYPE_NAME[type]}</option>
      )
    })

    return result;
  }

  const renderRegionOptions = () => {
    let result = []
    Object.keys(REGION_TYPE).forEach((type) => {
      result.push(
        <option value={type} key={type}>{REGION_TYPE_NAME[type]}</option>
      )
    })

    return result;
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex align='center'>
              <MdFilterAlt color="blue" fontWeight='bold'></MdFilterAlt>
              <Text fontSize='md' color='black'>
                Filters
              </Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>

            <Flex direction='column'>
              <Text fontSize='md' fontWeight='700'>Data to Display</Text>
              <Select
                onClick={(e) => handleDisplayType(e.target.value)}
                defaultValue={displayType}
                >
                {renderDispayOptions()}
              </Select>
            </Flex>

            <Flex direction='column'>
              <Text fontSize='md' fontWeight='700'>Region</Text>
              <Select
                onClick={(e) => handleRegionType(e.target.value)}
                defaultValue={regionType}
                >
                {renderRegionOptions()}
              </Select>
            </Flex>

          </ModalBody>

          <ModalFooter>
            {/* <Button colorScheme='blue' mr={3} onClick={handleFilter}>
              Filter
            </Button> */}
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Card
        justifyContent='center'
        align='center'
        direction='column'
        w='100%'
        mb='0px'
        {...rest}>
        <Flex justify='space-between' align='center' w='100%' ps='0px' pe='20px' pt='5px'>
          <Flex align='center' justify='space-between' w='100%'>
            <Text fontSize='lg' color='black' fontWeight='700'>Cost of Bundles Purchased</Text>
            <Flex align='center'>
              <Text fontSize='md' color='black' fontWeight='700'>Showing {REGION_TYPE_NAME[regionType]}</Text>
              <Button
                ms='auto'
                align='center'
                justifyContent='center'
                bg={bgButton}
                _hover={bgHover}
                _focus={bgFocus}
                _active={bgFocus}
                w='37px'
                h='37px'
                lineHeight='100%'
                borderRadius='10px'
                {...rest}
                onClick={handleModal}
              >
                <Icon as={MdFilterAlt} color={iconColor} w='24px' h='24px' />
              </Button>
            </Flex>
          </Flex>
        </Flex>
        <Flex w='100%' flexDirection={{ base: "row", lg: "row" }}>
          <Box minH='260px' minW='75%' mt='auto'>
            <LineChart
              chartData={data}
              chartOptions={{
                chart: {
                  toolbar: {
                    show: false,
                  },
                  dropShadow: {
                    enabled: true,
                    top: 13,
                    left: 0,
                    blur: 10,
                    opacity: 0.1,
                    color: "#4318FF",
                  },
                },
                colors: ["#4318FF", "#39B8FF", "#444444"],
                markers: {
                  size: 0,
                  colors: "white",
                  strokeColors: "#7551FF",
                  strokeWidth: 3,
                  strokeOpacity: 0.9,
                  strokeDashArray: 0,
                  fillOpacity: 1,
                  discrete: [],
                  shape: "circle",
                  radius: 2,
                  offsetX: 0,
                  offsetY: 0,
                  showNullDataPoints: true,
                },
                tooltip: {
                  theme: "dark",
                },
                dataLabels: {
                  enabled: false,
                },
                stroke: {
                  curve: "smooth",
                  type: "line",
                },
                xaxis: {
                  type: "numeric",
                  categories: category,
                  labels: {
                    style: {
                      colors: "#A3AED0",
                      fontSize: "12px",
                      fontWeight: "500",
                    },
                  },
                  axisBorder: {
                    show: false,
                  },
                  axisTicks: {
                    show: false,
                  },
                },
                yaxis: {
                  show: true,
                  type: "numeric",
                  labels: {
                    formatter: (val) => parseInt(val).toString()
                  }
                },
                legend: {
                  show: false,
                },
                grid: {
                  show: false,
                  column: {
                    color: ["#7551FF", "#39B8FF"],
                    opacity: 0.5,
                  },
                },
                color: ["#7551FF", "#39B8FF"],
              }}
            />
          </Box>
          <Flex direction='column' justify='center'>
            <Flex align='center'>
              <Box h='8px' w='8px' bg='#39B8FF' borderRadius='50%' me='4px' />
              <Text
                fontSize='md'
                color='secondaryGray.600'
                fontWeight='700'
                >
                New eSIMs Created
              </Text>
            </Flex>
            <Flex align='center'>
              <Box h='8px' w='8px' bg='brand.500' borderRadius='50%' me='4px' />
              <Text
                fontSize='md'
                color='secondaryGray.600'
                fontWeight='700'
                >
                Bundles Purchased
              </Text>
            </Flex>
            <Flex align='center'>
              <Box h='8px' w='8px' bg='#444444' borderRadius='50%' me='4px' />
              <Text
                fontSize='md'
                color='secondaryGray.600'
                fontWeight='700'
                >
                Top-Ups Applied
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </>
  );
}
