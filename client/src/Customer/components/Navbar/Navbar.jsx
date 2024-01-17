import React, { useState, useEffect } from 'react'
import { BsCloudMoon, BsCloudSun } from 'react-icons/bs'
import { FaCartArrowDown } from "react-icons/fa6";
import { MdNotificationsActive } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FaPowerOff } from "react-icons/fa6";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import UserDR from '../userProfileDR/UserDr';



const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setcurrentUser] = useState(true)

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  
  const [theme, setTheme] = useState('');

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  const handleThemeSwitch = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <>
      <nav className="bg-gray-800 fixed z-40 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Link to='/'>
                <h3 className='text-3xl dark:text-green-600 text-lime-300 cursor-pointer animate-bounce hover:text-lime-500'>E-Comerse__:)</h3>
                </Link>
             
              </div>
            </div>
            <div className="hidden sm:block">
              {/* Navbar links for medium screens and above */}
              <div className="flex items-center space-x-4">
                <Link to={`/category/allproduct`} className='dark:text-gray-400  text-gray-200'>Product</Link>


                {currentUser ?
                  <>
                    <Link to='/cart' className='dark:text-gray-400  text-gray-200'><FaCartArrowDown size={25} /></Link>
                    <Link  className='dark:text-gray-400  text-gray-200'><MdNotificationsActive size={25} /></Link>
                    <FaPowerOff className='dark:text-red-700  text-red-200 cursor-pointer' size={25}/>
                    <Link>
                    <UserDR/>
                      {/* <img
                        className='h-10 rounded-full iten-center'
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRf5SMOmms2QdtWPaI-0Qy0uUPY35B76MKAQ&usqp=CAU' 
                        alt='' /> */}
                    </Link>
                  </>
                  :
                  <>
                    <Link to='/signup' className='dark:text-gray-400  text-gray-200'>Sign Up</Link>
                    <Link to='/login' className='dark:text-gray-400  text-gray-200'>Sign In</Link>
                  </>
                }

                <span className='text-[30px] cursor-pointer' onClick={handleThemeSwitch}>
                  {theme === 'dark' ? <BsCloudSun size={30} /> : <BsCloudMoon size={30} className='text-gray-200' />}
                </span>

                {/* Add more links as needed */}
              </div>
            </div>
            <div className="flex sm:hidden">
              {/* Hamburger icon for small screens */}
              <button
                onClick={toggleNavbar}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring focus:ring-gray-300"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Responsive navbar links */}
        {isOpen && (
          <div className="sm:hidden bg-gray-700 flex">
            <div className="px-4 pt-2 pb-3 space-y-1">
              <Link className='dark:text-gray-400  text-gray-200'>Product</Link>
              <Link className='dark:text-gray-400  text-gray-200'><FaCartArrowDown size={25} /></Link>
              <Link className='dark:text-gray-400  text-gray-200'><MdNotificationsActive size={25} /></Link>
              <Link className='dark:text-gray-400  text-gray-200'>Sign Up</Link>
              <Link className='dark:text-gray-400  text-gray-200'>Sign In</Link>
              <Link>
                <img
                  className='h-10 rounded-full iten-center'
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRf5SMOmms2QdtWPaI-0Qy0uUPY35B76MKAQ&usqp=CAU'
                   alt='' />
              </Link>
              <Link className='dark:text-gray-400  text-gray-200'>Logout</Link>
              <span className='text-[30px] cursor-pointer' onClick={handleThemeSwitch}>
                {theme === 'dark' ? <BsCloudSun size={30} /> : <BsCloudMoon size={30} className='text-gray-200' />}
              </span>
              {/* Add more links as needed */}
            </div>
          </div>
        )}
      </nav>

    </>
  )
}

export default Navbar