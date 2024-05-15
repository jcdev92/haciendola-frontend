/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { errorStore } from "../store/useStore";
import { checkTokenExpired } from "../hooks/useFetch";

export const ProtectedRoute = ({ redirectTo = "/", children }) => {
  const [isAllowed, setIsAllowed] = useState(true);
  const token = localStorage.getItem("token");

  // check if the token is expired or not
  useEffect(() => {
    if (token === null) {
      errorStore.setState({
        status: 401,
        message: "You need to login first"
      })
      return setIsAllowed(false)
    }

    if (token) {
      setIsAllowed(true)
    }

    checkTokenExpired(token)
      .catch((err) => {
        errorStore.setState({
          status: err.response.data.statusCode,
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

