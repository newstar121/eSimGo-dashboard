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
import { Box } from "@chakra-ui/react";
import SimTable from "views/admin/simsTables/SimTable";
import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { API_URL } from "utils/constant";
import { API_KEY } from "utils/constant";
import { isThisYear, isThisMonth, getDate, isSameYear, isSameMonth, differenceInDays } from "date-fns";

const columns = [
  // {
  //   Header: '',
  //   accessor: 'id'
  // },
  {
    Header: "ICCID",
    accessor: "iccid",
  },
  {
    Header: "Reference",
    accessor: "customerRef",
  },
  {
    Header: "Last Action",
    accessor: "lastAction",
  },
  {
    Header: "Last Action Date",
    accessor: "actionDate",
  },
  {
    Header: "Assigned Date",
    accessor: "assignedDate",
  },
  {
    Header: "Country",
    accessor: "country",
  },
  {
    Header: "Total Data/Remaining Data",
    accessor: 'dataUsage'
  },
  {
    Header: "Expire Date",
    accessor: 'expireDate'
  }
];

export default function Settings() {

  const [simData, setSimData] = useState([])
  const [_simData, _setSimData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [year, setYear] = useState((new Date()).getFullYear())
  const [month, setMonth] = useState((new Date()).getMonth())

  useEffect(() => {
    let config = {
      method: 'get',
      url: API_URL + 'esims',
      headers: {
        'X-API-Key': API_KEY
      }
    };

    setIsLoading(true)
    axios(config)
      .then((response) => {
        if (response.data) {
          let result = []
          let no = 1;
          for (let i = 0; i < response.data.esims.length; i++) {
            let currentDate = new Date(year, month);
            let actionDate = (new Date(response.data.esims[i].actionDate))

            if (isSameYear(actionDate, currentDate) &&
              isSameMonth(actionDate, currentDate)) {
              result.push(Object.assign({}, response.data.esims[i], { id: no }))
              no++
            }
          }
          setSimData(result)
          _setSimData(result)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false)
      });
  }, [year, month])

  useEffect(async () => {
    let newResult = [];
    for (let i = 0; i < simData.length; i++) {
      let iccid = simData[i].iccid;
      // get location info
      let response = await axios.get(
        API_URL + 'esims/' + iccid + '/location',
        {
          params: {
            iccid: iccid
          },
          headers: {
            'X-API-Key': API_KEY,
            Authorization: 'Bearer ' + window.localStorage.getItem('refreshToken')
          }
        });

      let locationInfo = response.data;
      let country = locationInfo.country || '';

      response = await axios.get(
        API_URL + 'esims/' + iccid + '/bundles',
        {
          params: {
            iccid: iccid,
            includeUsed: false
          },
          headers: {
            'X-API-Key': API_KEY,
            Authorization: 'Bearer ' + window.localStorage.getItem('refreshToken')
          }
        });

      let bundles = response.data.bundles;
      let initialQuantity = bundles?.[0].assignments?.[0].initialQuantity;
      let remainingQuantity = bundles?.[0].assignments?.[0]?.remainingQuantity;
      let endTime = bundles?.[0].assignments?.[0]?.endTime;

      newResult.push(
        Object.assign({}, simData[i], {
          country: country,
          dataUsage: (initialQuantity / Math.pow(10, 9)) + 'GB / ' + (remainingQuantity / Math.pow(10, 9)).toFixed(2) + 'GB',
          expireDate: differenceInDays(new Date(endTime), new Date()) + 'Days Left',
        })
      )
    }
    _setSimData(newResult);
  }, [simData])

  const handleYear = (year) => {
    setYear(year)
  }

  const handleMonth = (month) => {
    setMonth(month)
  }

  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimTable
        handleYear={handleYear}
        handleMonth={handleMonth}
        columnsData={columns}
        tableData={_simData || []}
        isLoading={isLoading}
      />
    </Box>
  );
}
