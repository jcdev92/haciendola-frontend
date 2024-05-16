/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { errorStore } from "../store/useStore";
import { checkTokenExpired } from "../hooks/useFetch";

export const ProtectedRoute = ({ redirectTo = "/login", children }) => {
  const [isAllowed, setIsAllowed] = useState(true);
  const token = localStorage.getItem("token");

  // check if the token is expired or not
  useEffect(() => {
    if (token === null) {
      errorStore.getState().setState({
        statusCode: 401,
        message: "You need to login first"
      })
      return setIsAllowed(false)
    }

    checkTokenExpired(token)
      .catch((err) => {
        errorStore.getState().setState({
          statusCode: err.response.data.statusCode,
          message: err.response.data.message
        })
        setIsAllowed(false);
      });
      
  }, [token]);

 

  // validate if the token is expired or not
  if (!isAllowed) {
    return <Navigate to={redirectTo} />;
  }

  // if arrive one children, return this children, else if arrive a lot of childrens, return <Outlet />
  return children ? children : <Outlet />;
};

