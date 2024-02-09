import { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { FaBars, FaShoppingBag, FaTimes, FaUser } from "react-icons/fa";
import { navigation } from "./NavigationData.js";
import { Avatar, Badge, Link, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BsCloudMoon, BsCloudSun } from "react-icons/bs";
import DailogModel from "../DailogModel.jsx";
import { GrSettingsOption, GrUserSettings } from "react-icons/gr";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getUserCurrentData, logout, selectUser } from "../../../redux/features/userSlice.js";
import axios from "axios";
import { getUserCart, selectCart } from "../../../redux/features/cartSlice.js";
import { getUserOrder } from "../../../redux/features/orderSlice.js";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [theme, setTheme] = useState("");
  const [modelopen, setModelopen] = useState(false);
  const [isDrOpen, setIsDrOpen] = useState(false);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch()
  const CurrentUser = useSelector(selectUser);
  const CartItems = useSelector(selectCart);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          dispatch(getUserCurrentData());
          dispatch(getUserCart());
          dispatch(getUserOrder());
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [dispatch])


  // profile dropwon section
  const ProfileDropdown = () => {
    return (
      <div
        id="dropdown_profile"
        className="absolute top-11 right-8 w-36 rounded-lg mt-12 bg-slate-100 p-4 shadow-lg "
      >
        <div className="py-1">
          <Link onClick={() => { navigate('/Setting/profile') }}
            style={{ textDecoration: "none" }}
            className="flex cursor-pointer items-center p-2 rounded-sm text-lg  hover:bg-gray-200 no-underline"
          >
            <GrSettingsOption className="mx-1 text-gray-800 font-extrabold text-lg" />
            <span className=" text-gray-800">Account</span>
          </Link>
          {CurrentUser && CurrentUser.isAdmin === "true" && (
            <Link
              onClick={() => {
                navigate('/admin/dashboard')
              }}
              style={{ textDecoration: "none" }}
              className="flex cursor-pointer items-center p-2 rounded-sm text-lg  hover:bg-gray-200"
            >
              <FaUser className="mx-1 text-gray-800 font-extrabold text-lg" />
              <span className=" text-gray-800">Admin </span>
            </Link>
          )}

          <Link
            onClick={handleLogOut}
            style={{ textDecoration: "none" }}
            className="flex cursor-pointer items-center p-2 rounded-sm text-lg  hover:bg-gray-200"
          >
            <IoIosLogOut className="mx-1 text-gray-800 font-extrabold text-lg" />
            <span className=" text-gray-800"> Logout</span>
          </Link>
        </div>
      </div>
    );
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

  // Authmodel information  start
  const handleClickOpenModel = () => {
    setModelopen(true);
  };
  const handleCloseModel = () => {
    setModelopen(false);
    navigate("/");
  };
  // Authmodel information  end

  // logout
  const handleLogOut = async () => {
    dispatch(logout());
    setIsDrOpen(false);
    navigate("/");
  };


  const handleCategoryClick = (item, section, category, close) => {
    console.log(item.id, "", section.id, "", category.id)
    navigate(`/${category.id}/${section.id}/${item.id}`);
    close()
    // alert("1st :", category.id, "2nd :", section.id, "3rd :", item.id);
  }

  return (
    <div className="bg-white z-30 fixed w-full">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <FaTimes className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-gray-900",
                              "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel
                        key={category.name}
                        className="space-y-10 px-4 pb-8 pt-10"
                      >
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div
                              key={item.name}
                              className="group relative text-sm"
                            >
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img
                                  src={item.imageSrc}
                                  alt={item.imageAlt}
                                  className="object-cover object-center"
                                />
                              </div>
                              <a
                                href={item.href}
                                className="mt-6 block font-medium text-gray-900"
                              >
                                <span
                                  className="absolute inset-0 z-10"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </a>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p
                              id={`${category.id}-${section.id}-heading-mobile`}
                              className="font-medium text-gray-900"
                            >
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <a
                                    href={item.href}
                                    className="-m-2 block p-2 text-gray-500"
                                  >
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.id}
                        className="-m-2 no-underline block p-2 font-medium text-gray-900"
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over $50
        </p>
        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <FaBars className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="#">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </a>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open, close }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? "border-indigo-600 text-indigo-600"
                                  : " text-gray-700 hover:text-gray-800",
                                "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div
                                          key={item.name}
                                          className="group relative text-base sm:text-sm"
                                        >
                                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-cover object-center"
                                            />
                                          </div>
                                          <a
                                            href={item.href}
                                            className="mt-6 block font-medium text-gray-900"
                                          >
                                            <span
                                              className="absolute inset-0 z-10"
                                              aria-hidden="true"
                                            />
                                            {item.name}
                                          </a>
                                          <p
                                            aria-hidden="true"
                                            className="mt-1"
                                          >
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p
                                            id={`${section.name}-heading`}
                                            className="font-medium text-gray-900"
                                          >
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li
                                                key={item.name}
                                                className="flex"
                                              >
                                                <a className="hover:text-gray-800 cursor-pointer"
                                                  onClick={(e) => { handleCategoryClick(item, section, category, close) }}>
                                                  {item.name}
                                                </a>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.id}
                      className="flex cursor-pointer  items-center text-sm font-medium text-gray-700 hover:text-gray-800 no-underline"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                {/* Profile */}

                {!token ? (
                  <div className="flex lg:ml-6">
                    <a
                      onClick={handleClickOpenModel}
                      className="text-sm cursor-pointer font-medium text-gray-700 hover:text-gray-800"
                    >
                      Sign In
                    </a>
                  </div>
                ) : (
                  <div className="flex lg:ml-6" x-data="{ open: false }">
                    <div onClick={() => setIsDrOpen(!isDrOpen)}>
                      <Avatar
                        src={CurrentUser && CurrentUser.profilePicture}
                        sx={{ bgcolor: "lightblue", height: 45, width: 45 }}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                )}
                {isDrOpen && <ProfileDropdown />}
                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6 mr-3">
                  <Link
                    onClick={() => {
                      navigate("/cart");
                    }}
                    className="cursor-pointer"
                  >
                    <Tooltip title="Cart">
                      <Badge badgeContent={CartItems && CartItems.totalItem} color="error">
                        <FaShoppingBag className="h-6 w-6 flex-shrink-0 text-gray-600 group-hover:text-gray-500" />
                      </Badge>
                    </Tooltip>
                  </Link>
                </div>
                {/* Theme */}
                <div className="ml-4 flow-root lg:ml-6 mr-1 text-black">
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
        </nav>
      </header>
      <DailogModel modelopen={modelopen} handleCloseModel={handleCloseModel} />
    </div>
  );
}
