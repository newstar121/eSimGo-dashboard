/* eslint-disable */
import {
  Flex,
  Progress,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Spinner,
  Select
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
import { AndroidLogo, AppleLogo, WindowsLogo } from "components/icons/Icons";
import Menu from "components/menu/MainMenu";
import { format } from "date-fns";
import React, { useMemo, useState } from "react";
import { MdDataSaverOn, MdDetails, MdInfo, MdInfoOutline, MdQrCode2 } from "react-icons/md";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

export default function DevelopmentTable(props) {
  const { columnsData, tableData, isLoading, handleYear, handleMonth } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const [year, setYear] = useState((new Date()).getFullYear())
  const [month, setMonth] = useState((new Date()).getMonth())

  const [locationInfo, setLocationInfo] = useState({})
  const [bundleInfo, setBundleData] = useState([])

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("secondaryGray.500", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const renderYearOptions = () => {
    let currentYear = (new Date()).getFullYear();
    let result = []

    for (let i = 4; i >= 0; i--) {
      result.push(<option value={currentYear + i}>{currentYear + i}</option>)
    }
    for (let i = 1; i <= 5; i++) {
      result.push(<option value={currentYear - i}>{currentYear - i}</option>)
    }

    return result;
  }

  const renderMonthOptions = () => {
    let result = []

    for (let i = 1; i <= 12; i++) {
      result.push(<option value={i - 1}>{i}</option>)
    }

    return result
  }

  return (
    <>
      <Card
        direction='column'
        w='100%'
        px='0px'
        overflowX={{ sm: "scroll", lg: "hidden" }}>
        <Flex px='25px' justify='space-between' mb='20px' align='center'>
          <Text
            color={textColor}
            fontSize='22px'
            fontWeight='700'
            lineHeight='100%'>
            eSims Table
          </Text>
          {/* <Menu /> */}
          <Flex align='center'>
            <Text fontSize='md' fontWeight='700' mr='5'>Year:</Text>
            <Select
              w='100px'
              mr='5'
              onClick={(e) => handleYear(e.target.value)}
              defaultValue={year}
            >
              {renderYearOptions()}
            </Select>

            <Text fontSize='md' fontWeight='700' mr='5'>Month:</Text>
            <Select
              w='100px'
              mr='5'
              onClick={(e) => handleMonth(e.target.value)}
              defaultValue={month}
            >
              {renderMonthOptions()}
            </Select>
          </Flex>
        </Flex>
        <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
          <Thead>
            {headerGroups.map((headerGroup, index) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    pe='10px'
                    key={index}
                    borderColor={borderColor}>
                    <Flex
                      justify='space-between'
                      align='center'
                      fontSize={{ sm: "10px", lg: "12px" }}
                      color='gray.400'>
                      {column.render("Header")}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {/* {isLoading & (<Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />)} */}
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.Header === '') {
                      data = (
                        <MdQrCode2
                          color={iconColor}
                          me='16px'
                          h='18px'
                          w='15px'
                          fontSize='30px'
                        ></MdQrCode2>
                      );
                    } else if (cell.column.Header === "ICCID") {
                      data = (
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "Reference") {
                      data = (
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "Last Action") {
                      data = (
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "Last Action Date") {
                      data = (
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {format(new Date(cell.value), 'yyyy-MM-dd HH:mm:ss') || 'Unknown'}
                        </Text>
                      );
                    } else if (cell.column.Header === "Assigned Date") {
                      data = (
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {format(new Date(cell.value), 'yyyy-MM-dd HH:mm:ss') || 'Unknown'}
                        </Text>
                      );
                    } 
                    else if (cell.column.Header === "Country") {
                      data = (
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value || ''}
                        </Text>
                      );
                    }
                    else if (cell.column.Header === "Total Data/Remaining Data") {
                      data = (
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value || ''}
                        </Text>
                      );
                    }
                    else if (cell.column.Header === "Expire Date") {
                      data = (
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value || ''}
                        </Text>
                      );
                    }
                    // else if (cell.column.Header === 'ACTIONS') {
                    //   data = (
                    //     <Flex align='center'>
                    //       <MdInfoOutline
                    //         onClick={() => { showDetailInfo(cell.value) }}
                    //         color={iconColor}
                    //         me='16px'
                    //         h='18px'
                    //         w='15px'
                    //         fontSize='30px'
                    //       ></MdInfoOutline>
                    //       <MdDataSaverOn
                    //       color={iconColor}
                    //       me='16px'
                    //       h='18px'
                    //       w='15px'
                    //       fontSize='30px'
                    //     ></MdDataSaverOn>
                    //     </Flex>
                    //   );
                    // }
                    return (
                      <Td
                        {...cell.getCellProps()}
                        key={index}
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor='transparent'>
                        {data}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Card>
    </>
  );
}
