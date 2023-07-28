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
import { Box, Button, Flex, Select, Text, filter } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { useGlobalData } from "contexts/AppContext";
import { getPlans } from "contexts/AppContext";
import { PlanDialog } from "components/dialog/planDialog";
import { PLAN_TYPE } from "utils/constant";
import axios from "axios";
import { API_BACKEND_URL } from "utils/constant";
import { AlertDialog } from "components/dialog/alertDialog";
import { differenceInDays } from "date-fns";

const renderSpeed = (speed) => {
  let result = ''
  if (speed) {
    result = speed.join('/')
  }
  return result;
}

const columns = [
  {
    name: "COUNTRY",
    sortable: true,
    selector: row => row.country,
    grow: 25,
  },
  {
    name: "DATA",
    sortable: true,
    selector: row => (row.dataAmount / 1000) + 'GB',
    grow: 10,
  },
  {
    name: "DURATION",
    sortable: true,
    selector: row => row.duration + ' days',
    grow: 10,
  },
  {
    name: "SPEED",
    sortable: true,
    selector: row => renderSpeed(row.speed),
    grow: 15,
  },
  {
    name: "ROAMING",
    sortable: true,
    selector: row => row.roamingEnabled.length > 0 ? `YES (${row.roamingEnabled.length} Countries)` : 'NONE',
    grow: 20,
  },
  {
    name: 'BUNDLE',
    selector: row => row.description,
    sortable: true,
    grow: 40,
  },
  {
    name: "PRICE",
    sortable: true,
    selector: row => '$' + row.company_price,
    grow: 10,
  },
  {
    name: "ACTION",
    accessor: "action",
    selector: row => {
      <Button>Buy</Button>
    },
  },
];

export default function Plan() {

  // const [isLoading, setIsLoading] = useState(false)
  const [state, { updatePlans }] = useGlobalData()
  const [isOpen, setOpen] = useState(false)
  const [planData, setPlanData] = useState(false)

  const data = state?.plans || []

  const [filterData, setFilterData] = useState([])

  const countries = state?.countries || []
  const [countryOptions, setCountryOptions] = useState([])
  const [country, setCountry] = useState('')
  const [plan, setPlan] = useState('')

  const [isAlertOpen, setAlertOpen] = useState(false)

  useEffect(() => {

    getPlans().then((result) => {
      updatePlans(result);
    })

    let currentTime = (new Date()).getTime()
    let displayTime = window.localStorage.getItem('display-time');

    if(!displayTime || displayTime && differenceInDays(currentTime, displayTime) >=1 ) {
      setAlertOpen(true)
    }
    // for (let i = 0; i < datas.length; i++) {
    //   let item = datas[i]
    //   let keys = Object.keys(item)
    //   let country = item['Country / Region'];
    //   let roaming = item['Roaming Countries'];

    //   keys.forEach((key) => {
    //     let matched = key.match(/(\d+)GB\s\/\s(\d+)days/);

    //     if (matched) {
    //       let amount = matched[1]
    //       let duration = matched[2]
    //       let price = item[key]

    //       axios.post(
    //         API_BACKEND_URL + 'user/add_plan',
    //         {
    //           plan: {
    //             country: country,
    //             data: amount,
    //             duration: duration,
    //             roaming: roaming,
    //             price: price,
    //           }
    //         },
    //         {
    //           headers: {
    //             Accept: '*/*'
    //           }
    //         }
    //       ).then((response) => {


    //       })
    //     }
    //   })
    // }
  }, [])

  useEffect(() => {

    let countryOptions = [<option key='' value=''>All Countries</option>]

    countries.forEach((country) => {
      let key = country.iso;
      countryOptions.push(<option key={key} value={key}>{country.name}</option>)
    })
    setCountryOptions(countryOptions)

  }, [countries])

  useEffect(() => {
    if (data.length == 0) return;
    if (plan == '' && country == '') {
      setFilterData(data.sort((a, b) => a.country > b.country ? 1 : -1))
    } else if (plan == '' && country !== '') {
      let countryName = countries[countries.findIndex((item) => item.iso == country)].name || '';
      let result = data.filter((item) => item.country == countryName)

      setFilterData(result.sort((a, b) => a.country > b.country ? 1 : -1))
    } else if (plan !== '' && country == '') {
      let result = data.filter((item) => item.dataAmount / 1000 + 'G' == plan)
      setFilterData(result.sort((a, b) => a.country > b.country ? 1 : -1))
    } else {
      let countryName = countries[countries.findIndex((item) => item.iso == country)].name || '';
      let result = data.filter((item) => item.country == countryName)
      result = result.filter((item) => item.dataAmount / 1000 + 'G' == plan)
      setFilterData(result.sort((a, b) => a.country > b.country ? 1 : -1))
    }

  }, [data, country, plan])

  const handleCountry = (country) => {
    setCountry(country)
  }

  const handlePlan = (plan) => {
    setPlan(plan)
  }

  const renderPlanOptions = () => {
    let result = [<option key='' value=''>All</option>]
    let keys = Object.keys(PLAN_TYPE);
    keys.forEach((key) => {
      result.push(
        <option value={key} key={key} >{PLAN_TYPE[key]}</option>
      )
    })
    return result;
  }

  // Chakra Color Mode
  return (
    <>

      <PlanDialog
        isOpen={isOpen}
        handleClose={() => { setOpen(false) }}
        planData={planData}
      />
      <AlertDialog
        isOpen={isAlertOpen}
        handleClose={() => { setAlertOpen(false) }}
        planData={planData}
      />
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }} pl='20px' pr='20px'>


        <DataTable
          style={{ padding: '20px' }}
          // title="eSIMs Plan"
          title={(
            <Flex align='center' justify='space-between'>
              <Text>eSIMs Plan</Text>
              <Flex align='center'>
                <Text fontSize='xl' mr='5' >Country:</Text>
                <Select
                  w='200px'
                  mr='10'
                  onChange={(e) => handleCountry(e.target.value)}
                  value={country}
                >
                  {countryOptions}
                </Select>
                <Text fontSize='xl' mr='5' ml='5'>Data Type:</Text>
                <Select
                  w='200px'
                  onChange={(e) => handlePlan(e.target.value)}
                  value={plan}
                >
                  {renderPlanOptions()}
                </Select>
              </Flex>
            </Flex>
          )}
          columns={columns}
          data={filterData}
          pagination
          onRowClicked={(row) => {
            setOpen(true)
            setPlanData(row)
          }}
        >
        </DataTable>
      </Box>
    </>

  );
}
