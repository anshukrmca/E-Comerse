import React, { useState } from "react";
import Footer from "../../../Customer/components/Footer/Footer";
import { HiShoppingBag } from "react-icons/hi";
import { FaEye, FaUserAlt } from "react-icons/fa";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Products from "../product/Products";
import User from "../user/User";
import Dashboard from "./Dashboard";
import { IoMdSettings, IoIosColorPalette,IoIosArrowDown } from "react-icons/io";
import { BiCategory } from "react-icons/bi";
import Category from "../category/Category";
import Color from "../color/Color";

const Sidebar = ({ isSidebarOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <aside
        className={`fixed left-0 z-40 w-64 h-full transition-transform ${
          isSidebarOpen ? "" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full  px-3 py-4 overflow-y-auto dark:bg-slate-800 bg-white">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/admin/dashboard"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/product"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <HiShoppingBag />
                <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/user"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaUserAlt />
                <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
              </Link>
            </li>
            <li>
              <button
                onClick={toggleDropdown}
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <IoMdSettings />
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Settings
                </span>
                <IoIosArrowDown />
              </button>
              {isDropdownOpen && (
                <div>
                  <ul>
                    <li>
                      <Link   to="/admin/color"
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                        <IoIosColorPalette />
                        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                          Color
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link   to="/admin/category"
                       className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                        <BiCategory />
                        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                          Categary
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            <li>
              <Link
                to="/"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaEye />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  View as Customer
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64 h-[100%]">
        <div className="p-4  border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="product" element={<Products />} />
            <Route path="user" element={<User />} />
            <Route path="color" element={<Color />} />
            <Route path="category" element={<Category />} />
          </Routes>
        </div>
        <div className="dark:bg-slate-800">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
