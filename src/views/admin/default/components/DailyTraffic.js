import React, { useEffect, useState } from "react";

// Chakra imports
import { Box, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import BarChart from "components/charts/BarChart";

// Custom components
import Card from "components/card/Card.js";
// import {
//   barChartDataDailyTraffic,
//   barChartOptionsDailyTraffic,
// } from "variables/charts";

// Assets
import { RiArrowUpSFill } from "react-icons/ri";
import { MdCalendarMonth, MdEventRepeat } from "react-icons/md";
import axios from "axios";
import { API_URL } from "utils/constant";
import { API_KEY } from "utils/constant";

export default function DailyTraffic(props) {
  const { ...rest } = props;

  const [showBundles, setShowBundles] = useState(true)
  // const [thisPeriodBundlesSold, setThisPeriodBundlesSold] = useState([])
  // const [previousPeriodBundlesSold, setPreviousPeriodBundlesSold] = useState([])

  const [countryInfo, setCountryInfo] = useState([])

  const [axisInfo, setAxisInfo] = useState([])
  const [data, setData] = useState()

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
      setData(response.data)
    }).catch(function (error) {
      console.log(error);
    });
  }

  useEffect(() => {
    getBundlesSoldByCountry("CalendarMonth")
  }, [])

  useEffect(() => {
    let country_bundles = {}
    if(!data) return
    for (let i = 0; i < data.thisPeriodBundlesSold.length; i++) {
      let country = data.thisPeriodBundlesSold[i].country;
      if (country_bundles[country]) {
        country_bundles[country]++
      } else {
        country_bundles[country] = 1
      }
    }

    if (showBundles) {
      for (let i = 0; i < data.previousPeriodBundlesSold.length; i++) {
        let country = data.previousPeriodBundlesSold[i].country;
        if (country_bundles[country]) {
          country_bundles[country]++
        } else {
          country_bundles[country] = 1
        }
      }
    }

    let keys = Object.keys(country_bundles)
    let values = Object.values(country_bundles)

    setCountryInfo(values)

    setAxisInfo(keys)
  }, [data, showBundles])

  const handleShowBundle = (value) => {
    setShowBundles(value)
  }

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  return (
    <Card align='center' direction='column' w='100%' {...rest}>
      <Flex justify='space-between' align='start' px='10px' pt='5px'>
        <Flex flexDirection='column' align='start' justify='center' me='20px'>
          <Flex w='100%'>
            <Text
              me='auto'
              color='black'
              fontSize='lg'
              fontWeight='700'>
              Top Bundles Sold by Country
            </Text>
          </Flex>
          {/* <Flex align='end'>
            <Text
              color={textColor}
              fontSize='34px'
              fontWeight='700'
              lineHeight='100%'>
              2.579
            </Text>
            <Text
              ms='6px'
              color='secondaryGray.600'
              fontSize='sm'
              fontWeight='500'>
              Visitors
            </Text>
          </Flex> */}
        </Flex>
        <Flex align='center'>
          {/* <Icon as={RiArrowUpSFill} color='green.500' />
          <Text color='green.500' fontSize='sm' fontWeight='700'>
            +2.45%
          </Text> */}
          <Text color='black' fontSize='md' fontWeight='700'>
            Showing last 30 days
          </Text>
          {showBundles ? (
            <MdCalendarMonth onClick={() => { handleShowBundle(false) }} size={30} color="blue" className="icon-hover"></MdCalendarMonth>
          ) : (
            <MdEventRepeat onClick={() => { handleShowBundle(true) }} size={30} color="blue" className="icon-hover"></MdEventRepeat>
          )}

        </Flex>
      </Flex>
      <Box h='240px' mt='auto'>
        <BarChart
          chartData={[
            {
              name: "Daily Traffic",
              data: countryInfo,
            },
          ]}
          chartOptions={{
            chart: {
              toolbar: {
                show: false,
              },
            },
            tooltip: {
              style: {
                fontSize: "12px",
                fontFamily: undefined,
              },
              onDatasetHover: {
                style: {
                  fontSize: "12px",
                  fontFamily: undefined,
                },
              },
              theme: "dark",
            },
            xaxis: {
              categories: axisInfo,
              show: false,
              labels: {
                show: true,
                style: {
                  colors: "#A3AED0",
                  fontSize: "14px",
                  fontWeight: "500",
                },
              },
              axisBorder: {
                show: true,
              },
              axisTicks: {
                show: false,
              },
            },
            yaxis: {
              show: true,
              color: "black",
              labels: {
                show: true,
                style: {
                  colors: "#CBD5E0",
                  fontSize: "14px",
                },
              },
            },
            grid: {
              show: false,
              strokeDashArray: 5,
              yaxis: {
                lines: {
                  show: true,
                },
              },
              xaxis: {
                lines: {
                  show: false,
                },
              },
            },
            fill: {
              type: "gradient",
              gradient: {
                type: "vertical",
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                colorStops: [
                  [
                    {
                      offset: 0,
                      color: "#4318FF",
                      opacity: 1,
                    },
                    {
                      offset: 100,
                      color: "rgba(67, 24, 255, 1)",
                      opacity: 0.28,
                    },
                  ],
                ],
              },
            },
            dataLabels: {
              enabled: false,
            },
            plotOptions: {
              bar: {
                borderRadius: 10,
                columnWidth: "40px",
              },
            },
          }}
        />
      </Box>
    </Card>
  );
}
