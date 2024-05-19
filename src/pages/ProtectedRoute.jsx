/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import { tokenStatusStore } from "../store/store";
import { checkTokenStatus } from "../hooks/useQueryData";
import { useEffect } from "react";

export const ProtectedRoute = ({ redirectTo = "/", children }) => {

  const token = localStorage.getItem("token");
  checkTokenStatus(token);

  const tokenState = tokenStatusStore.getState().state.isLoggedIn;

  // validate if the token is expired or not
  useEffect(() => {
    if (!tokenState) {
      localStorage.removeItem("token");
      <Navigate to={redirectTo} />
    }
  }, [tokenState, redirectTo])


  // if arrive one children, return this children, else if arrive a lot of childrens, return <Outlet />
  return children ? children : <Outlet />;
};

