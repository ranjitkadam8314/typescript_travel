import React, { lazy } from "react";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Password";
import SignupIcon from "@mui/icons-material/AppRegistrationOutlined";
import DestinationIcon from "@mui/icons-material/Place";
const HomePage = lazy(() => import("../../features/home/HomePage"));
const LoginPage = lazy(() => import("../../features/login/LoginPage"));
const DestinationPage = lazy(
  () => import("../../features/destinations/Destination")
);
const ForgotPassword = lazy(
  () => import("../../features/forgot-password/ForgotPassword")
);
const ChangePassword = lazy(
  () => import("../../features/change-password/ChangePassword")
);
//
const SignUpPage = lazy(() => import("../../features/sign -up/SignUpPage"));

export default [
  {
    label: "Home",
    component: <HomePage />,
    icon: <HomeIcon />,
    showInMenu: true,
    hasChildren: false,
    path: "",
  },

  {
    label: "Destinations",
    component: <DestinationPage />,
    icon: <DestinationIcon />,
    showInMenu: true,
    hasChildren: true,
    path: "destinations/", // change do you remember it
  },

  {
    label: "Login",
    component: <LoginPage />,
    icon: <LoginIcon />,
    showInMenu: true,
    hasChildren: false,
    path: "login",
  },

  {
    label: "Forgot Password ",
    component: <ForgotPassword />,
    icon: <LoginIcon />,
    showInMenu: false,
    hasChildren: false,
    path: "forgot-password",
  },
  {
    label: "Change Password ",
    component: <ChangePassword />,
    icon: <LoginIcon />,
    showInMenu: false,
    hasChildren: false,
    path: "change-password/:token",
  },

  // sign up route
  {
    label: "Sign Up ",
    component: <SignUpPage />,
    icon: <SignupIcon />,
    showInMenu: false,
    hasChildren: true,
    path: "sign-up",
  },
];
