import React, { ReactElement, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import BlankLayout from "./layouts/blank/BlankLayout";
import FullLayout from "./layouts/full/FullLayout";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, selectAuth } from "./app/slices/authSlice";
import AuthService from "./services/AuthService";

interface IProtectedRoute {
  children: ReactElement;
}

function App() {
  const ProtectedRoute: React.FunctionComponent<IProtectedRoute> = ({
    children,
  }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = sessionStorage.getItem("accesstoken");

    useEffect(() => {
      if (token)
        AuthService.validateToken()
          .then((response) => {
            console.log("valid token");
          })
          .catch((err) => {
            console.log("invalid token");
            sessionStorage.clear();
            dispatch(removeUser());
            navigate("/login");
          });
    }, []);

    // get user from redux store
    const loggedUser = useSelector(selectAuth);
    //get token from sessionStorage

    return loggedUser?._id && token ? children : <Navigate to="/login" />;
  };

  return (
    <>
      <ToastContainer autoClose={5000} />
      <Routes>
        <Route path="/*" element={<BlankLayout />} />
        <Route
          path="secured/*"
          element={
            <ProtectedRoute>
              <FullLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
