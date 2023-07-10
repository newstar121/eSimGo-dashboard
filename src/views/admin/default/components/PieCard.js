// Chakra imports
import { Box, Flex, Text, Select, useColorModeValue } from "@chakra-ui/react";
import axios from "axios";
// Custom components
import Card from "components/card/Card.js";
import PieChart from "components/charts/PieChart";
// import { pieChartData, pieChartOptions } from "variables/charts";
import { VSeparator } from "components/separator/Separator";
import React, { useEffect, useState } from "react";
import { API_KEY } from "utils/constant";
import { API_URL } from "utils/constant";

export default function Conversion(props) {
  const { ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const cardColor = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  const [pieChartData, setPieChartData] = useState([0, 0, 0, 0, 0, 0])
  const [bundlesPerRegion, setBundlesPerRegion] = useState([])
  const [totalSold, setTotalSold] = useState(0)

  // BUNDLES PURCHASED BY REGION
  const getBundlesPurchasedByRegion = () => {
    axios.post(
      API_URL + 'dashboard/charts', {
      "filterBy": "0",
      "monthEnd": null,
      "monthStart": null,
      "subType": null,
      "type": "bundlesPurchasedByRegion"
    }, {
      headers: {
        'X-API-Key': API_KEY,
        Authorization: 'Bearer ' + window.localStorage.getItem('refreshToken')
      }
    }).then(function (response) {
      setBundlesPerRegion(response.data.bundlesPerRegion)

      let count = 0;
      let data = [0, 0, 0, 0, 0, 0]

      for (let i = 0; i < response.data.bundlesPerRegion.length; i++) {
        count += response.data.bundlesPerRegion[i].bundlesSold

        switch (response.data.bundlesPerRegion[i].region) {
          case 'Africa':
            data[0] = response.data.bundlesPerRegion[i].percentageOfTotalSales
            break;
          case 'Asia':
            data[1] = response.data.bundlesPerRegion[i].percentageOfTotalSales
            break;
          case 'Europe':
            data[2] = response.data.bundlesPerRegion[i].percentageOfTotalSales
            break;
          case 'North America':
            data[3] = response.data.bundlesPerRegion[i].percentageOfTotalSales
            break;
          case 'Oceania':
            data[4] = response.data.bundlesPerRegion[i].percentageOfTotalSales
            break;
          case 'South America':
            data[5] = response.data.bundlesPerRegion[i].percentageOfTotalSales
            break;
          default: break;
        }
      }

      setTotalSold(count)
      setPieChartData(data)

    }).catch(function (error) {
      console.log(error);
    });
  }

  useEffect(() => {
    getBundlesPurchasedByRegion()
  }, [])

  return (
    <Card p='10px' align='center' direction='row' w='100%' {...rest}>
      <Flex
        px={{ base: "0px", "2xl": "10px" }}
        justifyContent='space-between'
        alignItems='center'
        w='100%'
        mb='8px'
        align='center'>
        <Text color='black' fontSize='lg' fontWeight='700' mt='4px'>
          Bundles Purchased by Region
        </Text>
      </Flex>

      <Flex direction='row' align='center' justify='space-between' h='100%'>
        <PieChart
          h='100%'
          w='100%'
          chartData={pieChartData}
          chartOptions={{
            labels: ['Africa', 'Asia', 'Europe', 'North America', 'Oceania', 'Source America'],
            colors: ["#66FFFF", "#FFFF00", "#4318FF", "#6AD2FF", "#EFF4FB", "#00FF00", "#0000FF"],
            chart: {
              width: "50px",
            },
            states: {
              hover: {
                filter: {
                  type: "none",
                },
              },
            },
            legend: {
              show: false,
            },
            dataLabels: {
              enabled: false,
            },
            hover: { mode: null },
            plotOptions: {
              donut: {
                expandOnClick: false,
                donut: {
                  labels: {
                    show: false,
                  },
                },
              },
            },
            fill: {
              colors: ["#66FFFF", "#FFFF00", "#4318FF", "#6AD2FF", "#EFF4FB", "#00FF00", "#0000FF"],
            },
            tooltip: {
              enabled: true,
              theme: "dark",
            },
          }}
        />
        <Flex direction='column' justify='center' w='25%'>
          <Flex align='center'>
            <Box h='8px' w='8px' bg='#66FFFF' borderRadius='50%' me='4px' />
            <Text
              fontSize='xs'
              color='secondaryGray.600'
              fontWeight='700'
            >
              Africa
            </Text>
          </Flex>
          <Flex align='center'>
            <Box h='8px' w='8px' bg='#FFFF00' borderRadius='50%' me='4px' />
            <Text
              fontSize='xs'
              color='secondaryGray.600'
              fontWeight='700'
            >
              Asia
            </Text>
          </Flex>
          <Flex align='center'>
            <Box h='8px' w='8px' bg='#4318FF' borderRadius='50%' me='4px' />
            <Text
              fontSize='xs'
              color='secondaryGray.600'
              fontWeight='700'
            >
              Europe
            </Text>
          </Flex>
          <Flex align='center'>
            <Box h='8px' w='8px' bg='#6AD2FF' borderRadius='50%' me='4px' />
            <Text
              fontSize='xs'
              color='secondaryGray.600'
              fontWeight='700'
            >
              North America
            </Text>
          </Flex>
          <Flex align='center'>
            <Box h='8px' w='8px' bg='#00FF00' borderRadius='50%' me='4px' />
            <Text
              fontSize='xs'
              color='secondaryGray.600'
              fontWeight='700'
            >
              Oceania
            </Text>
          </Flex>
          <Flex align='center'>
            <Box h='8px' w='8px' bg='#0000FF' borderRadius='50%' me='4px' />
            <Text
              fontSize='xs'
              color='secondaryGray.600'
              fontWeight='700'
            >
              South America
            </Text>
          </Flex>
        </Flex>
      </Flex>

    </Card>
  );
}
