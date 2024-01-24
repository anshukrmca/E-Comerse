import React, { useState } from 'react'
import Footer from '../../../Customer/components/Footer/Footer'
import { FaPowerOff } from 'react-icons/fa6';
import { HiShoppingBag } from "react-icons/hi";
import { FaCartArrowDown } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Sidebar = ({ isSidebarOpen }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };


    // logout 
  const handleLogOut = async () => {
    const res = await axios.get("/api/auth/signout");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };


    return (
        <>
            <aside
                className={`fixed left-0 z-40 w-64 h-full transition-transform ${isSidebarOpen ? '' : '-translate-x-full'
                    } sm:translate-x-0`}
                aria-label="Sidebar"
            >
                <div className="h-full  px-3 py-4 overflow-y-auto dark:bg-slate-800 bg-white">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <span className="ms-3">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <button
                                onClick={toggleDropdown}
                                type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                <FaCartArrowDown />
                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">E-commerce</span>
                                <IoIosArrowDown />
                            </button>
                            {isDropdownOpen && (
                                <div>
                                    <ul>
                                        <li>
                                            <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Products</a>
                                        </li>
                                        <li>
                                            <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Billing</a>
                                        </li>
                                        <li>
                                            <a href="#" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Invoice</a>
                                        </li>
                                    </ul>

                                </div>
                            )}

                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">

                                <HiShoppingBag />
                                <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
                            </a>
                        </li>
                        <li>
                            <Link onClick={navigate("/")} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FaPowerOff />
                                <span className="flex-1 ms-3 whitespace-nowrap">View as Customer</span>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={handleLogOut} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FaPowerOff />
                                <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>

            <div className="p-4 sm:ml-64 h-[100%]">
                <div className="p-4  border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    sdjhfcj
                </div>
                <div className='dark:bg-slate-800'>
                    <Footer />

                </div>
            </div>

        </>

    )
}

export default Sidebar