"use client";
import {
  HiOutlineLogout,
  HiUser,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { errorStore, successStore, tokenStatusStore } from "../../../store/store";

export const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("token");
    tokenStatusStore.getState().setState({ isLoggedIn: false });
    errorStore.getState().clearState()
    successStore.getState().clearState()
  };

  return (
    <>
      <aside
        id="default-sidebar"
        className="md:w-1/6 bg-transparent md:flex md:h-screen z-30"
        aria-label="Sidebar"
      >
        <div className="hidden m-4 w-full md:flex flex-col justify-aroun ml-3 px-4 py-4 overflow-y-auto scrollbar-thin scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg scrollbar-thumb-blue-600 scrollbar-track-transparent backdrop-blur-md rounded-md shadow-md shadow-gray-800 hover:scale-98 hover:shadow-sm hover:shadow-gray-400 transition-all ease-in-out duration-200 bg-white">
          <div className="flex flex-col justify-center items-center lg:p-2 xl:p-4 border-b border-gray-500/20">
            <div className="font-bebas my-2 text-orange-400 drop-shadow-lg text-center">
              <h1>Bienvenido</h1>
              <h2 className="text-sm">
                JUAN
              </h2>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <ul className="space-y-2 font-exo h-full">
              <li>
                <Link
                  to="/dashboard"
                  className={
                    window.location.pathname === "/dashboard"
                      ? "flex items-center p-2 text-orange-400 text-sm rounded-lg transition-all ease-in-out duration-200"
                      : "flex items-center p-2 text-white rounded-lg hover:scale-110 transition-all ease-in-out duration-200 hover:text-orange-400"
                  }
                >
                  <HiUser />
                  <span className="flex-1 ml-3 whitespace-nowrap">Products</span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <li className="border-t border-gray-500/20 xl:py-4">
                <Link
                  to="/"
                  className={
                    window.location.pathname === "/"
                      ? "flex items-center p-2 mt-2 text-orange-500 text-sm rounded-lg transition-all ease-in-out duration-200"
                      : "flex items-center p-2 mt-2 text-orange-500 rounded-lg hover:scale-90 transition-all ease-in-out duration-200 hover:text-orange-300"
                  }
                  onClick={handleLogout}
                >
                  <HiOutlineLogout />
                  <span className="flex-1 ml-3 whitespace-nowrap">Log Out</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};
