"use client";
import {
  HiOutlineLogout,
  HiUser,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { errorStore, successStore, tokenStatusStore } from "../../store/useStore";

export const Sidebar = () => {
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
        className="md:w-1/6 bg-transparent md:flex md:h-screen dark:bg-gray-800 z-30"
        aria-label="Sidebar"
      >
        <div className="hidden m-4 w-full md:flex flex-col justify-aroun ml-3 px-4 py-4 overflow-y-auto scrollbar-thin scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg scrollbar-thumb-blue-600 scrollbar-track-transparent backdrop-blur-md rounded-md shadow-md shadow-blue-500 hover:scale-98 hover:shadow-sm hover:shadow-blue-200 transition-all ease-in-out duration-200">
          <div className="flex flex-col justify-center items-center lg:p-2 xl:p-4 border-b border-blue-500/20">
            <div className="font-bebas my-2 text-blue-300 text-center">
              <h1>Bienvenido</h1>
              <div className="text-sm dark:text-gray-400">
                JUAN
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <ul className="space-y-2 font-exo h-full">
              <li>
                <Link
                  to="/dashboard"
                  className={
                    window.location.pathname === "/dashboard"
                      ? "flex items-center p-2 text-blue-400 text-sm rounded-lg transition-all ease-in-out duration-200"
                      : "flex items-center p-2 text-white rounded-lg hover:scale-110 transition-all ease-in-out duration-200 hover:text-indigo-700"
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
              <li className="border-t border-blue-500/20 xl:py-4">
                <Link
                  to="/"
                  className={
                    window.location.pathname === "/"
                      ? "flex items-center p-2 mt-2 text-indigo-500 text-sm rounded-lg transition-all ease-in-out duration-200"
                      : "flex items-center p-2 mt-2 text-white rounded-lg hover:scale-110 transition-all ease-in-out duration-200 hover:text-indigo-700"
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
