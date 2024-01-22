import React, { useState } from 'react'
import Layout from '../layout/Layout'
import { CgProfile } from "react-icons/cg";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { Link, Route, Routes } from 'react-router-dom';
import UserProfile from './UserProfile'
import UserAddress from './UserAddress'
import { FaLocationDot } from "react-icons/fa6";
import OrderDetail from './OrderDetail';
import { FaShippingFast } from "react-icons/fa";
import OrderSummery from './OrderSummery';

const UserNavigation = [
    {
        tittle: "Profile",
        icon: <CgProfile size={25} className='mx-2' />,
        path: '/Setting/profile'
    }
    , {
        tittle: "Manage Addresses",
        icon: <FaLocationDot size={25} className='mx-2' />,
        path: '/Setting/address'
    },
    {
        tittle: "Oder Details",
        icon: <FaShippingFast size={25} className='mx-2' />,
        path: '/Setting/order'
    }
]

const UProfileSetting = () => {

    const [isOpen, setIsOpne] = useState(false)
    return (
        <>
            <Layout>
                <div className="flex mb-4 gap-2 mx-4">
                    <div className={`${isOpen ? 'w-64' : 'w-20'} p-2 px-4 dark:bg-slate-700 bg-slate-300 relative`}>
                        <button
                            onClick={() => { setIsOpne(!isOpen) }}
                            className="absolute top-0 -right-4 p-2 focus:outline-none "
                        >
                            {!isOpen ? <MdKeyboardArrowLeft size={30} className='font-bold' /> : <MdKeyboardArrowRight size={30} className='font-bold' />}
                        </button>

                        {UserNavigation.map((item, i) => {
                            return (
                                <Link key={i} to={item.path}>
                                    <div className='mb-4 flex items-center cursor-pointer'>
                                        {item.icon}
                                        <p className={`${isOpen ? 'block' : 'hidden'}`}>{item.tittle}</p>
                                    </div>
                                    <hr className="my-2 border-t border-gray-500" />
                                </Link>
                            )
                        })}
                    </div>

                    <div className="w-full">
                        <Routes>
                            <Route path="profile" element={<UserProfile />} />
                            <Route path="address" element={<UserAddress />} />
                            <Route path="order" element={<OrderDetail />} />
                            <Route path="order-summer" element={<OrderSummery />} />
                        </Routes>
                    </div>
                </div>

            </Layout>
        </>
    )
}

export default UProfileSetting