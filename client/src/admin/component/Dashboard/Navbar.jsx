import {  useEffect, useState } from 'react'
import { Disclosure } from '@headlessui/react'
import { MdOutlineMenu } from "react-icons/md";
import { BsCloudMoon, BsCloudSun } from "react-icons/bs";
import { Avatar, Tooltip } from '@mui/material';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCurrentData, selectUser } from '../../../redux/features/userSlice';


export default function Navbar() {
  const [theme, setTheme] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const CurrentUser = useSelector(selectUser);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch()

  useEffect(()=>{
    if(token){
      dispatch(getUserCurrentData());
    }
  },[dispatch])


  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // theme information  start
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  // theme information  end



  return (
    <>
      <Disclosure as="nav" className="bg-gray-800 fixed w-full z-50">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <Disclosure.Button onClick={toggleSidebar} className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <MdOutlineMenu className="block h-6 w-6" aria-hidden="true" />
              </Disclosure.Button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:justify-start">
              <div className="flex flex-shrink-0">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div>
                <Avatar
                 src={CurrentUser && CurrentUser.profilePicture} />
              </div>
              <div className="ml-4 flow-root lg:ml-6 mr-1 text-white">
                <Tooltip title="Theme">
                  <span
                    className="text-[30px] cursor-pointer"
                    onClick={handleThemeSwitch}
                  >
                    {theme === "dark" ? (
                      <BsCloudSun size={30} />
                    ) : (
                      <BsCloudMoon size={30} />
                    )}
                  </span>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </Disclosure>
      <div className='pt-16'>
        <Sidebar isSidebarOpen={isSidebarOpen} />
      </div>

    </>
  )
}
