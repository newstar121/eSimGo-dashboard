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
import OrderTable from "views/admin/orderTable/OrderTable";
import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { API_URL } from "utils/constant";
import { API_KEY } from "utils/constant";

const columns = [
  {
    Header: "TYPE",
    accessor: "charge_type",
  },
  {
    Header: "ITEM",
    accessor: "item",
  },
  {
    Header: "TOTAL",
    accessor: "total",
  },
  {
    Header: "CURRENCY",
    accessor: "currency",
  },
  {
    Header: "STATUS",
    accessor: "status",
  },
  {
    Header: "REFERENCE",
    accessor: "charge_reference",
  },
  {
    Header: "CREATE DATE",
    accessor: "createDate",
  },
  {
    Header: "ASSIGNED",
    accessor: "assigned",
  },
  {
    Header: "ACTIONS",
    accessor: "action",
  },
];

export default function Settings() {

  const [chargeData, setChargeData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let config = {
      method: 'get',
      url: API_URL + 'orders',
      headers: {
        'X-API-Key': API_KEY
      }
    };

    setIsLoading(true)
    axios(config)
      .then((response) => {
        if (response.data) {
          let result = []
          for (let i = 0; i < response.data.orders.length; i++) {
            let order = response.data.orders[i]
            let tempObj = {
              charge_type: order.order[0].type || 'UNKNOWN',
              item: order.order[0].item || '',
              total: order.total || 0,
              currency: order.currency || '',
              status: order.status || '',
              charge_reference: order.orderReference || '',
              createDate: order.createDate || 'UNKNOWN',
              assigned: order.assigned || false
            }
            result.push(Object.assign({}, tempObj))
          }
          setChargeData(result)
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
      <OrderTable
        columnsData={columns}
        tableData={chargeData}
        isLoading={isLoading}
      />
    </Box>
  );
}
