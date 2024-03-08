import Layout from '../layout/Layout'
import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { FaTimes } from 'react-icons/fa';
import { FaChevronDown, FaFilter, FaTh } from 'react-icons/fa';
import { fillters, singleFilter, sortOptions } from "./filterData.js";
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Pagination,
    Radio,
    RadioGroup,
    useTheme,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { IoIosRemove } from "react-icons/io";
import Product from './ProductCard.jsx'
import axios from 'axios'
import DataLoading from '../Loding/DataLoading.jsx';
import { tokens } from '../../../theme.js';

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function ProductStore() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [products, setProducts] = useState([])
    const [pageNum, setPageNum] = useState(1);
    const param = useParams()
    const decodedQueryString = decodeURIComponent(location.search);
    const searchParamms = new URLSearchParams(decodedQueryString);
    const colorValue = searchParamms.get("color");
    const sizeValue = searchParamms.get("size");
    const priceValue = searchParamms.get("price");
    const discount = searchParamms.get("discount");
    const sortValue = searchParamms.get("sort");
    const pageNumber = searchParamms.get("page") || 1;
    const stock = searchParamms.get("stock");


    // product data 
    useEffect(() => {
        const [minPrice, maxPrice] = priceValue === null ? [0, 0] : priceValue.split("-").map(Number)
        const data = {
            category: param.levelThree,
            color: colorValue || [],
            size: sizeValue || [],
            minPrice,
            maxPrice,
            minDiscount: discount || 0,
            sort: sortValue || "price_low",
            pageNumber: pageNumber,
            pageSize: 12,
            stock: stock
        }
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/product', {
                    params: {
                        color: data.color,
                        size: data.size,
                        minPrice: data.minPrice,
                        maxPrice: data.maxPrice,
                        minDiscount: data.minDiscount,
                        category: data.category,
                        stock: data.stock,
                        sort: data.sort,
                        pageNumber: data.pageNumber,
                        pageSize: data.pageSize,
                    }
                });
                setProducts(response.data.product.content);
                setPageNum(response.data.product.totalPage);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [param.levelThree, colorValue, sizeValue, priceValue, discount, sortValue, pageNumber, stock]);


    const handlePageChnage = (event, value) => {
        const searchParamms = new URLSearchParams(location.search);
        searchParamms.set("page", value);
        const quary = searchParamms.toString();
        navigate({ search: `?${quary}` });
    }

    const handleSortChange = (value) => {
        const searchParamms = new URLSearchParams(location.search);
        searchParamms.set("sort", value);
        const quary = searchParamms.toString();
        navigate({ search: `?${quary}` });
    }

    const handleFilter = (value, sectionID) => {
        const searchParamms = new URLSearchParams(location.search);
        let filterValue = searchParamms.getAll(sectionID);
        if (filterValue.length > 0 && filterValue[0].split(",").includes(value)) {
            filterValue = filterValue[0].split(",").filter((item) => item != value);
            if (filterValue.length === 0) {
                searchParamms.delete(sectionID);
            }
        } else {
            filterValue.push(value);
        }
        if (filterValue.length > 0) {
            searchParamms.set(sectionID, filterValue.join(","));
        }
        const quary = searchParamms.toString();
        navigate({ search: `?${quary}` });
    };

    const handleRadioFilterChange = (e, sectionID) => {
        const searchParamms = new URLSearchParams(location.search);
        searchParamms.set(sectionID, e.target.value);
        const quary = searchParamms.toString();
        navigate({ search: `?${quary}` });
    }

    return (
        <Layout>
                <div style={{backgroundColor:`${colors.primary[400]}`}}>
                    {/* Mobile filter dialog */}
                    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                        <Dialog
                            as="div"
                            className="relative z-40 lg:hidden"
                            onClose={setMobileFiltersOpen}
                        >
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

                            <div className="fixed inset-0 z-40 flex ">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transition ease-in-out duration-300 transform"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transition ease-in-out duration-300 transform"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel style={{backgroundColor:`${colors.primary[400]}`}} className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto py-4 pb-12 shadow-xl">
                                        <div className="flex items-center justify-between px-4">
                                            <h2 className="text-lg font-medium">
                                                Filters
                                            </h2>
                                            <button
                                                type="button"
                                                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md  p-2"
                                                onClick={() => setMobileFiltersOpen(false)}
                                            >
                                                <span className="sr-only">Close menu</span>
                                                <FaTimes className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </div>

                                        {/* Filters */}
                                        <form className="mt-4 border-t border-gray-200 px-4">
                                            {fillters.map((section) => (
                                                <Disclosure
                                                    as="div"
                                                    key={section.id}
                                                    className="border-b border-gray-200 py-6"
                                                >
                                                    {({ open }) => (
                                                        <>
                                                            <h3 className="-my-3 flow-root">
                                                                <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm">
                                                                    <span className="font-medium">
                                                                        {section.name} 
                                                                    </span>
                                                                    <span className="ml-6 flex items-center">
                                                                        {open ? (
                                                                            <IoIosRemove
                                                                                className="h-5 w-5"
                                                                                aria-hidden="true"
                                                                            />
                                                                        ) : (
                                                                            <GoPlus
                                                                                className="h-5 w-5"
                                                                                aria-hidden="true"
                                                                            />
                                                                        )}
                                                                    </span>
                                                                </Disclosure.Button>
                                                            </h3>
                                                            <Disclosure.Panel className="pt-6">
                                                                <div className="space-y-4">
                                                                    {section.options.map((option, optionIdx) => (
                                                                        <div
                                                                            key={option.value}
                                                                            className="flex items-center"
                                                                        >
                                                                            <input
                                                                                onClick={() => { handleFilter(option.value, section.id) }}
                                                                                id={`filter-${section.id}-${optionIdx}`}
                                                                                name={`${section.id}[]`}
                                                                                defaultValue={option.value}
                                                                                type="checkbox"
                                                                                defaultChecked={option.checked}
                                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                            />
                                                                            <label
                                                                                htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                                className="ml-3 text-sm"
                                                                            >
                                                                                {option.label}
                                                                            </label>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </Disclosure.Panel>
                                                        </>
                                                    )}
                                                </Disclosure>
                                            ))}
                                            {singleFilter.map((section) => (
                                                <Disclosure
                                                    as="div"
                                                    key={section.id}
                                                    className="border-b border-gray-200 py-6"
                                                >
                                                    {({ open }) => (
                                                        <>
                                                            <h3 className="-my-3 flow-root">
                                                                <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm">
                                                                    <FormLabel
                                                                        className="font-medium"
                                                                        id="demo-radio-buttons-group-label"
                                                                    >
                                                                        {" "}
                                                                        {section.name}
                                                                    </FormLabel>

                                                                    <span className="ml-6 flex items-center">
                                                                        {open ? (
                                                                            <IoIosRemove
                                                                                className="h-5 w-5"
                                                                                aria-hidden="true"
                                                                            />
                                                                        ) : (
                                                                            <GoPlus
                                                                                className="h-5 w-5"
                                                                                aria-hidden="true"
                                                                            />
                                                                        )}
                                                                    </span>
                                                                </Disclosure.Button>
                                                            </h3>
                                                            <Disclosure.Panel className="pt-6">
                                                                <div className="space-y-4">
                                                                    <FormControl>
                                                                        <RadioGroup
                                                                            aria-labelledby="demo-radio-buttons-group-label"
                                                                            defaultValue="female"
                                                                            name="radio-buttons-group"
                                                                        >
                                                                            {section.options.map(
                                                                                (option, optionIdx) => (
                                                                                    <FormControlLabel
                                                                                        key={optionIdx}
                                                                                        value={option.value}
                                                                                        control={<Radio />}
                                                                                        label={option.label}
                                                                                       
                                                                                        onChange={(e) => handleRadioFilterChange(e, section.id)}
                                                                                    />
                                                                                )
                                                                            )}
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </div>
                                                            </Disclosure.Panel>
                                                        </>
                                                    )}
                                                </Disclosure>
                                            ))}
                                        </form>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </Dialog>
                    </Transition.Root>

                    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-4">
                            <h1 className="text-4xl font-bold tracking-tight">
                                New Arrivals
                            </h1>

                            <div className="flex items-center">
                                <Menu as="div" className="relative inline-block text-left">
                                    <div>
                                        <Menu.Button className="group inline-flex justify-center text-sm font-medium">
                                            Sort
                                            <FaChevronDown
                                                className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 "
                                                aria-hidden="true"
                                            />
                                        </Menu.Button>
                                    </div>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="py-1 cursor-pointer">
                                                {sortOptions.map((option) => (
                                                    <Menu.Item key={option.name}>
                                                        {({ active }) => (
                                                            <a
                                                                onClick={(e) => handleSortChange(option.value)}
                                                                className={classNames(
                                                                    option.current
                                                                        ? "font-medium"
                                                                        : "",
                                                                    active ? "bg-gray-200 dark:bg-gray-600" : "",
                                                                    "block px-4 py-2 text-sm"
                                                                )}
                                                            >
                                                                {option.name}
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>

                                <button
                                    type="button"
                                    className="-m-2 ml-5 p-2  sm:ml-7"
                                >
                                    <span className="sr-only">View grid</span>
                                    <FaTh className="h-5 w-5" aria-hidden="true" />
                                </button>
                                <button
                                    type="button"
                                    className="-m-2 ml-4 p-2 sm:ml-6 lg:hidden"
                                    onClick={() => setMobileFiltersOpen(true)}
                                >
                                    <span className="sr-only">Filters</span>
                                    <FaFilter className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>
                        </div>

                        <section aria-labelledby="products-heading" className="pb-24 pt-6 ">

                            <div className="grid grid-cols-1 gap-x-8 gap-y-5 lg:grid-cols-4">
                                {/* Filters */}
                                <div className=''>
                                    <div className='hidden lg:block'>
                                        <div className="py-5 items-center flex justify-between">
                                            <h1 className="text-lg opacity-60 font-bold ">Filters</h1>
                                            <FaFilter />
                                        </div>
                                    </div>
                                    <form className="hidden lg:block">
                                        {fillters.map((section) => (
                                            <Disclosure
                                                as="div"
                                                key={section.id}
                                                className="border-b border-gray-200 py-6"
                                            >
                                                {({ open }) => (
                                                    <>
                                                        <h3 className="-my-3 flow-root">
                                                            <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm">
                                                                <span className="font-medium">
                                                                    {section.name}
                                                                </span>
                                                                <span className="ml-6 flex items-center">
                                                                    {open ? (
                                                                        <IoIosRemove
                                                                            className="h-5 w-5"
                                                                            aria-hidden="true"
                                                                        />
                                                                    ) : (
                                                                        <GoPlus
                                                                            className="h-5 w-5"
                                                                            aria-hidden="true"
                                                                        />
                                                                    )}
                                                                </span>
                                                            </Disclosure.Button>
                                                        </h3>
                                                        <Disclosure.Panel className="pt-6">
                                                            <div className="space-y-4">
                                                                {section.options.map((option, optionIdx) => (
                                                                    <div
                                                                        key={option.value}
                                                                        className="flex items-center"
                                                                    >
                                                                        <input
                                                                            onChange={() => {
                                                                                handleFilter(option.value, section.id);
                                                                            }}
                                                                            id={`filter-${section.id}-${optionIdx}`}
                                                                            name={`${section.id}[]`}
                                                                            defaultValue={option.value}
                                                                            type="checkbox"
                                                                            defaultChecked={option.checked}
                                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                        />
                                                                        <label
                                                                            htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                            className="ml-3 text-sm "
                                                                        >
                                                                            {option.label}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        ))}
                                        {singleFilter.map((section) => (
                                            <Disclosure
                                                as="div"
                                                key={section.id}
                                                className="border-b border-gray-200 py-6"
                                            >
                                                {({ open }) => (
                                                    <>
                                                        <h3 className="-my-3 flow-root">
                                                            <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm">
                                                                <FormLabel
                                                                    className="font-medium"
                                                                    id="demo-radio-buttons-group-label"
                                                                    
                                                                >
                                                                    {" "}
                                                                    {section.name}
                                                                </FormLabel>

                                                                <span className="ml-6 flex items-center">
                                                                    {open ? (
                                                                        <IoIosRemove
                                                                            className="h-5 w-5"
                                                                            aria-hidden="true"
                                                                        />
                                                                    ) : (
                                                                        <GoPlus
                                                                            className="h-5 w-5"
                                                                            aria-hidden="true"
                                                                        />
                                                                    )}
                                                                </span>
                                                            </Disclosure.Button>
                                                        </h3>
                                                        <Disclosure.Panel className="pt-6">
                                                            <div className="space-y-4">
                                                                <FormControl>
                                                                    <RadioGroup
                                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                                        defaultValue="female"
                                                                        name="radio-buttons-group"
                                                                    >
                                                                        {section.options.map((option, optionIdx) => (
                                                                            <FormControlLabel
                                                                                key={optionIdx}
                                                                                value={option.value}
                                                                                control={<Radio />}
                                                                                label={option.label}
                                                                                onChange={(e) => handleRadioFilterChange(e, section.id)}
                                                                            />
                                                                        ))}
                                                                    </RadioGroup>
                                                                </FormControl>
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        ))}
                                    </form>
                                </div>
                                {/* Product grid */}
                                <div className="lg:col-span-3 w-full">
                                    {products && products.length > 0 ? <>
                                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 mb-3">
                                            {products && products.map((item, index) => (
                                                <Product
                                                    key={item._id}
                                                    P_id={item._id}
                                                    P_name={item.title}
                                                    description={item.description}
                                                    price={item.price}
                                                    discountedPrice={item.discountedPrice}
                                                    discountedPercentage={item.discountedPercentage}
                                                    color={item.color}
                                                    size={item.size}
                                                    image={item.mainImage}

                                                />
                                            ))}
                                        </div>

                                        <section className='w-full px-[1.6rem] shadow-lg' style={{backgroundColor:`${colors.primary[400]}`}}>
                                            <div className='px-4 py-3 flex justify-center'>
                                                <Pagination count={pageNum} color='secondary'
                                                    onChange={handlePageChnage} />
                                            </div>
                                        </section>
                                    </>
                                        : <DataLoading/>}
                                </div>
                            </div>
                        </section>

                    </main>
                </div>
        
        </Layout>
    );
}
