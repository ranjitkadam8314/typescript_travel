import { lazy } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CustomerIcon from "@mui/icons-material/People";
import DestinationIcon from "@mui/icons-material/Place";

const Dashboard = lazy(() => import("../../features/dashboard/Dashboard"));
const Customer = lazy(() => import("../../features/customers/Customers"));
const Destination = lazy(
  () => import("../../features/destination-master/DestinationMaster")
);

export default [
  {
    label: "Dashboard",
    component: <Dashboard />,
    icon: <DashboardIcon />,
    showMenu: true,
    hasChildren: false,
    roles: ["admin", "customer"],
    path: "",
  },

  {
    label: "Customers",
    component: <Customer />,
    icon: <CustomerIcon />,
    showMenu: true,
    hasChildren: false,
    roles: ["admin"],
    path: "customers",
  },

  {
    label: "Destinations",
    component: <Destination />,
    icon: <DestinationIcon />,
    showMenu: true,
    hasChildren: true,
    path: "destinations",
    roles: ["admin", "customer"],
  },
];
