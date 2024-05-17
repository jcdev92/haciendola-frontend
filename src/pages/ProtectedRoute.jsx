/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import { tokenStatusStore } from "../store/useStore";
import { checkTokenStatus } from "../hooks/queryData";

export const ProtectedRoute = ({ redirectTo = "/", children }) => {

  const token = localStorage.getItem("token");
  checkTokenStatus(token)

  const tokenState = tokenStatusStore.getState().state.isLoggedIn;
  console.log(tokenState)

  // validate if the token is expired or not
  if (tokenState === false) {
    return <Navigate to={redirectTo} />;
  }

  // if arrive one children, return this children, else if arrive a lot of childrens, return <Outlet />
  return children ? children : <Outlet />;
};

