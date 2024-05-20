import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Dashboard/Navbar/Navbar";

export const DashboardPage = () => {
  return (
    <div className="hidden md:flex-row h-full w-full lg:flex flex-col items-center justify-between bg-inventory bg-cover bg-center bg-no-repeat md:bg-fixed md:bg-left-top md:bg-no-repeat relative"
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-tr from-orange-300 to-orange-700 opacity-80 animate-gradient-x"></div>
      <Navbar />
      <Outlet />
    </div>
  );
};