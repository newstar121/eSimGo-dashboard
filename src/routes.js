import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdDashboard,
  MdAccountBalanceWallet,
  MdInventory,
  MdViewKanban,
  MdLogout,
  MdAddCircleOutline,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import RTL from "views/admin/rtl";

// Auth Imports
import SignInCentered from "views/auth/signIn";
import { IoAddCircleOutline } from "react-icons/io5";

const routes = [
  {
    name: "DASHBOARD",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdDashboard} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "BUY DATA BUNDLES",
    layout: "/admin",
    path: "/nft-marketplace",
    icon: (
      <Icon
        as={MdAddCircleOutline}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: NFTMarketplace,
    secondary: true,
  },
  {
    name: "TOP-UP ACCOUNT",
    layout: "/admin",
    icon: <Icon as={MdAccountBalanceWallet} width='20px' height='20px' color='inherit' />,
    path: "/data-tables",
    component: DataTables,
  },
  {
    name: "BUNDLE INVENTORY",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdInventory} width='20px' height='20px' color='inherit' />,
    component: Profile,
  },
  {
    name: "VIEW eSIMS",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdViewKanban} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
  },
  {
    name: "LOG OUT",
    layout: "/admin",
    path: "/sign-in",
    icon: <Icon as={MdLogout} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
  },
];

export default routes;
