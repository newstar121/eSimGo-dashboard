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
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { API_BACKEND_URL } from "utils/constant";
import axios from "axios";


const columns = [
  {
    name: 'BUNDLE',
    selector: row => `eSIM, ${row.data}GB, ${row.duration} Days, ${row.country}, Unthrottled`,
    sortable: true,
    grow: 30,
  },
  {
    name: "COUNTRY",
    sortable: true,
    selector: row => row.country,
    grow: 10,
  },
  {
    name: "DATA",
    sortable: true,
    selector: row => row.data + 'GB',
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
    selector: row => row.speed,
    grow: 15,
  },
  {
    name: "ROAMING",
    sortable: true,
    selector: row => row.roaming.length > 0 ? `YES (${row.roaming.length} Countries)` : 'NONE',
    grow: 15,
  },
  {
    name: "PRICE",
    sortable: true,
    selector: row => '$' + row.price.toFixed(2),
    grow: 10,
  },
  // {
  //   name: "ACTION",
  //   accessor: "action",
  //   selector: row => row.action,
  // },
];

export default function Plan() {

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {

    axios.get(
      API_BACKEND_URL + 'user/get_plans',
      {
        headers: {
          Authorization: 'Bearer ' + window.localStorage.getItem('token')
        }
      }
    ).then((response) => {
      if (response.data.success) {
        let result = response.data.plans || [];
        for (let i = 0; i < result.length; i++) {
          let countryStr = result[i].roaming;
          countryStr = countryStr.replace(/\s/g, "");
          let countries = countryStr.split(',');
          result[i].roaming = countries || []
        }
        setData(response.data.plans)
      } else {
        setData([])
      }
    }).catch((error) => {
      console.log('get plans error', error);
      setData([])
    });

  }, [])
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }} pl='20px' pr='20px'>
      {/* <PlanTable
        columnsData={columns}
        tableData={data}
        isLoading={isLoading}
      /> */}
      <DataTable
        style={{ padding: '20px' }}
        title="ESIMs Plan"
        columns={columns}
        data={data}
        pagination>

      </DataTable>
    </Box>
  );
}
