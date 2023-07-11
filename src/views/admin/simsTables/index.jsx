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
import { useGlobalData } from "contexts/AppContext";
import { getViewESimsData } from "contexts/AppContext";

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

  const [isLoading, setIsLoading] = useState(false)

  const [year, setYear] = useState((new Date()).getFullYear())
  const [month, setMonth] = useState((new Date()).getMonth())

  const [state, { updateViewESims }] = useGlobalData();

  const simData = state?.eSimData || [];

  useEffect(() => {
    if (!simData ) {
      getViewESimsData(year, month).then((result) => {
        updateViewESims(result)
      })
    }
  }, [year, month])

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
        tableData={simData}
        isLoading={isLoading}
      />
    </Box>
  );
}
