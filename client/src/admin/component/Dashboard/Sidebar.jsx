import React, { useState } from "react";
import Footer from "../../../Customer/components/Footer/Footer";
import { HiShoppingBag } from "react-icons/hi";
import { FaEye, FaUserAlt } from "react-icons/fa";
import { Link, Route, Routes } from "react-router-dom";
import Products from "../product/Products";
import User from "../user/User";
import Dashboard from "./Dashboard";
import { IoMdSettings, IoIosColorPalette, IoIosArrowDown } from "react-icons/io";
import { BiCategory } from "react-icons/bi";
import Category from "../category/Category";
import Color from "../color/Color";
import Navbar from "./Navbar";
import { Box, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import { MdMenu } from "react-icons/md";
import './Navbar.css'
import { RiLuggageCartLine } from "react-icons/ri";
import Order from "../order/Order";
import UserAllInformation from "../user/UserAllInformation";


const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const sidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen)
  }

  return (
    <>
      <aside
        className={`fixed left-0 z-40 w-60 h-full transition-transform ${isSidebarOpen ? "" : "-translate-x-full"
          } sm:translate-x-0 border-r-2 border-gray-400`}
        aria-label="Sidebar"
        style={{ background: `${colors.primary[400]}`, transition: "transform 0.3s ease" }}
      >
        <div className={`h-full py-4 overflow-y-auto`} style={{color:`${colors.grey[200]}`}}>
          <Box mb="25px">
            <div className='MenuBtnSide'>
              <Tooltip title="Close Menu">
                <IconButton onClick={() => sidebarToggle()}>
                  <MdMenu />
                </IconButton>
              </Tooltip>
            </div>
            <Box display="flex" justifyContent="center" alignItems="center">
              <img
                alt="profile-user"
                width="100px"
                height="100px"
                src="https://firebasestorage.googleapis.com/v0/b/linkedin-clone-d79a1.appspot.com/o/man.png?alt=media&token=4b126130-032a-45b5-bea4-87adb0d096dc"
                style={{ cursor: "pointer", borderRadius: "50%" }}
              />
            </Box>
            <Box textAlign="center">
              <Typography
                variant="h2"
                color={colors.grey[100]}
                fontWeight="bold"
                sx={{ m: "10px 0 0 0" }}
              >
                Anshu Kumar
              </Typography>
              <Typography variant="h5" color={colors.greenAccent[500]}>
                Fancy Admin
              </Typography>
            </Box>
          </Box>
          <ul className="font-medium space-y-0">
            <li className={`p-1 hover:bg-slate-400/20 hover:text-[#4cceac]`}>
              <Link
                to="/admin/dashboard"
                className="flex items-center p-2 rounded-lg group"
              >
                <svg
                  className="w-5 h-5  transition duration-75"
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
            <li className="p-1 hover:bg-slate-400/20 hover:text-[#4cceac]">
              <Link
                to="/admin/product"
                className="flex items-center p-2"
              >
                <HiShoppingBag size={20} className="hover:text-[#4cceac]"/>
                <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
              </Link>
            </li>
            <li className="p-1 hover:bg-slate-400/20 hover:text-[#4cceac]">
              <Link
                to="/admin/user"
                className="flex items-center p-2"
              >
                <FaUserAlt size={20} className="hover:text-[#4cceac]"/>
                <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
              </Link>
            </li>
            <li className="p-1 hover:bg-slate-400/20 hover:text-[#4cceac]">
              <Link
                to="/admin/order"
                className="flex items-center p-2"
              >
                <RiLuggageCartLine size={20} className="hover:text-[#4cceac]"/>
                <span className="flex-1 ms-3 whitespace-nowrap">Order</span>
              </Link>
            </li>
            <li className="p-1 hover:bg-slate-400/20 hover:text-[#4cceac]">
              <button
                onClick={toggleDropdown}
                type="button"
                className="flex items-center w-full p-2 text-base transition duration-75 rounded-lg"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <IoMdSettings size={20} className="hover:text-[#4cceac]"/>
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Settings
                </span>
                <IoIosArrowDown />
              </button>
              </li>
              {isDropdownOpen && (
                <div>
                  <ul>
                    <li className="hover:bg-slate-400/10 hover:text-[#4cceac]">
                      <Link to="/admin/color"
                        className="flex items-center w-full p-2 transition duration-75 rounded-lg pl-11">
                        <IoIosColorPalette className="hover:text-[#4cceac]"/>
                        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                          Color
                        </span>
                      </Link>
                    </li>
                    <li className="hover:bg-slate-400/10 hover:text-[#4cceac]">
                      <Link to="/admin/category"
                        className="flex items-center w-full p-2 transition duration-75 rounded-lg pl-11">
                        <BiCategory className="hover:text-[#4cceac]"/>
                        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                          Categary
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
           

            <li className="p-1 hover:bg-slate-400/20 hover:text-[#4cceac]">
              <Link
                to="/"
                className="flex items-center p-2"
              >
                <FaEye size={20} className="hover:text-[#4cceac]"/>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  View as Customer
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <div className="sm:ml-64 h-[100%]">
        <Navbar sidebarToggle={sidebarToggle} />
        <div className="p-3 rounded-lg mb-4">
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="product" element={<Products />} />
            <Route path="user" element={<User />} />
            <Route path="user/:id" element={<UserAllInformation />} />
            <Route path="color" element={<Color />} />
            <Route path="category" element={<Category />} />
            <Route path="order" element={<Order />} />
          </Routes>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
