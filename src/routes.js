import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdDashboard,
  MdAccountBalanceWallet,
  MdInventory,
  MdViewKanban,
  MdLogout,
  MdAddCircleOutline,
  MdSimCard,
  MdCreditCard,
  MdHistoryEdu,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import SimsTable from "views/admin/simsTables";
import OrderTable from "views/admin/orderTable";
import PlanTable from "views/admin/planTable";
import Payment from "views/admin/payment";

import Setting from "views/admin/setting";
// Auth Imports
import SignInCentered from "views/auth/signIn";
import { IoAddCircleOutline } from "react-icons/io5";

const routes = [
  {
    name: "DASHBOARD",
    layout: "/admin",
    path: "/dashboard",
    icon: <Icon as={MdDashboard} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  // {
  //   name: "BUY DATA BUNDLES",
  //   layout: "/admin",
  //   path: "/nft-marketplace",
  //   icon: (
  //     <Icon
  //       as={MdAddCircleOutline}
  //       width='20px'
  //       height='20px'
  //       color='inherit'
  //     />
  //   ),
  //   component: NFTMarketplace,
  //   secondary: true,
  // },
  // {
  //   name: "TOP-UP ACCOUNT",
  //   layout: "/admin",
  //   icon: <Icon as={MdAccountBalanceWallet} width='20px' height='20px' color='inherit' />,
  //   path: "/data-tables",
  //   component: DataTables,
  // },
  {
    name: "EDIT PROFILE",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdInventory} width='20px' height='20px' color='inherit' />,
    component: Setting,
    hidden: true
  },
  {
    name: "VIEW eSIMS",
    layout: "/admin",
    path: "/esim",
    icon: <Icon as={MdSimCard} width='20px' height='20px' color='inherit' />,
    component: SimsTable,
  },
  {
    name: "VIEW CHARGES",
    layout: "/admin",
    path: "/charge",
    icon: <Icon as={MdCreditCard} width='20px' height='20px' color='inherit' />,
    component: OrderTable,
  },
  {
    name: "REPORTS",
    layout: "/admin",
    path: "/report",
    icon: <Icon as={MdHistoryEdu} width='20px' height='20px' color='inherit' />,
    component: DataTables,
  },
  {
    name: "BILLING AND PAYMENT",
    layout: "/admin",
    path: "/payment",
    icon: <Icon as={MdAccountBalanceWallet} width='20px' height='20px' color='inherit' />,
    component: Payment,
  },
  {
    name: "eSIM PLANS",
    layout: "/admin",
    path: "/plan",
    icon: <Icon as={MdAccountBalanceWallet} width='20px' height='20px' color='inherit' />,
    component: PlanTable,
  },
  {
    name: "LOG OUT",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLogout} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
  },
];

export default routes;
