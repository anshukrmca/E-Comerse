import React from 'react'
import { FaShippingFast } from "react-icons/fa";
import { FiGift } from "react-icons/fi";
import { BiSolidOffer } from "react-icons/bi";
import { MdOutlineSupportAgent } from "react-icons/md";
import { MdOutlinePayment } from "react-icons/md";

const DileveryDel = () => {
    const Delev = ({ icon, tittle, subtittle }) => {
        return (

            <div className='flex p-2 items-center'>
                <div className='mx-2 text-4xl'>{icon}</div>
                <div>
                    <h6>{tittle}</h6>
                    <p className='mb-0 text-sm font-light'>{subtittle}</p>
                </div>
            </div>
        )
    }
    return (
        <>
            <div className='grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-5 mb-2 bg-slate-600 mt-4'>
                <Delev icon={<FaShippingFast />} tittle="Free Shipping" subtittle="From all order over $20" />
                <Delev icon={<FiGift />} tittle="Daily Suprise offers" subtittle="Save upto 20%" />
                <Delev icon={<MdOutlineSupportAgent />} tittle="Support 24/7" subtittle="Support with an expert" />
                <Delev icon={<BiSolidOffer />} tittle="Affrodalbe Price" subtittle="Get factory Default Price" />
                <Delev icon={<MdOutlinePayment />} tittle="Secure Payments" subtittle="100% Protected Payment" />
            </div>

        </>
    )
}

export default DileveryDel