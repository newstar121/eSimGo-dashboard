import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdDashboard,
  MdAccountBalanceWallet,
  MdInventory,
  MdLogout,
  MdSimCard,
  MdTravelExplore,
  MdAppRegistration,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import SimsTable from "views/admin/simsTables";
import PlanTable from "views/admin/planTable";
import Payment from "views/admin/payment";

import Setting from "views/admin/setting";
// Auth Imports
import SignInCentered from "views/auth/signIn";
import SignUp from "views/auth/signUp";
const routes = [
  {
    name: "DASHBOARD",
    layout: "/admin",
    path: "/dashboard",
    icon: <Icon as={MdDashboard} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "EDIT PROFILE",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdInventory} width='20px' height='20px' color='inherit' />,
    component: Setting,
    hidden: true
  },
  {
    name: "CURRENT eSIMS",
    layout: "/admin",
    path: "/esim",
    icon: <Icon as={MdSimCard} width='20px' height='20px' color='inherit' />,
    component: SimsTable,
  },
  {
    name: "BILLING & PAYMENT",
    layout: "/admin",
    path: "/payment",
    icon: <Icon as={MdAccountBalanceWallet} width='20px' height='20px' color='inherit' />,
    component: Payment,
  },
  {
    name: "eSIM PLANS",
    layout: "/admin",
    path: "/plan",
    icon: <Icon as={MdTravelExplore} width='20px' height='20px' color='inherit' />,
    component: PlanTable,
  },
  {
    name: "LOG OUT",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLogout} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
  },
  {
    name: "SIGN UP",
    layout: "/auth",
    path: "/sign-up",
    icon: <Icon as={MdAppRegistration} width='20px' height='20px' color='inherit' />,
    component: SignUp,
    hidden: true
  },
];

export default routes;
