import { Outlet } from "react-router-dom";
import { Products } from "../components/dashboard/Products/Products";
import { Animated } from "../components/dashboard/Animated";

export const DashboardPage = () => {
  return (
    <div
      className="
      hidden
    md:flex-row
    h-screen
    w-screen
    lg:flex
    flex-col
    items-center
    bg-milky-way
    bg-cover
    bg-center
    bg-no-repeat
    md:bg-fixed
    md:bg-left-top
    md:bg-no-repeat
    relative
    "
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-tr from-black to-blue-700 opacity-80 animate-gradient-x"></div>
      <Outlet />
    </div>
  );
};

export const ProductsPage = () => {
  return (
    <div className="w-full h-full">
      <Animated>
        <Products />
      </Animated>
    </div>
  );
};

