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

const columns = [
  {
    Header: '',
    accessor: 'id'
  },
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
    Header: "Actions",
    accessor: "action",
  },
];

export default function Settings() {

  const [simData, setSimData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

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
          for (let i = 0; i < response.data.esims.length; i++) {
            result.push(Object.assign({}, response.data.esims[i], { id: i }))
          }
          setSimData(result)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false)
      });
  }, [])
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimTable
        columnsData={columns}
        tableData={simData}
        isLoading={isLoading}
      />
    </Box>
  );
}
