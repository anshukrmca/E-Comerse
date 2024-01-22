import React from 'react'
import Layout from '../layout/Layout'
import { IoCloudDownloadOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { Avatar, AvatarGroup } from '@mui/material';
import HeaderTittle from '../HeaderTittle';





const OrderSummery = () => {
    return (
        <Layout>
            <div className='mx-4'>
                <HeaderTittle tittle="Order Details"/>
                <div className='flex flex-col sm:flex-row items-center shadow-lg p-4 mb-4 dark:bg-slate-900 bg-slate-300'>
                    <div className='border-r border-gray-400 p-2 w-full sm:w-3/4 mb-4 sm:mb-0'>
                        <div className='flex flex-col sm:flex-row gap-4 font-semibold'>
                            <p>Anshu Kumar</p>
                            <p>8210500193</p>
                        </div>
                        <p className='text-sm'>
                            KKS Balaji Mens Hostel, 5, Lakshmikanthan St, Pondy Bazaar, Parthasarathi Puram, T. Nagar, Chennai,
                            Tamil Nadu 600017, CHENNAI, Tamil Nadu - 600018
                        </p>
                    </div>
                    <hr className='border-r border-gray-400 hidden sm:block' />
                    <div className='flex justify-center items-center p-2 w-full sm:w-1/4'>
                        <p className='text-center'>Download Invoice</p>
                        <IoCloudDownloadOutline size={30} className='hover:text-lime-600 mx-4 cursor-pointer' />
                    </div>
                </div>
            </div>

            <div className='mx-4 dark:bg-slate-800 bg-slate-300 px-4 py-2'>


                {[1, 1, 1, 1, 1, 1, 1].map((item, i) => {
                    return (
                        <Link to='/order-summery' key={i} className='flex cursor-pointer flex-col sm:flex-row justify-between items-center shadow-sm hover:shadow-2xl p-4 mb-4 dark:bg-slate-900 bg-slate-300'>

                            <div className='mb-4 sm:mb-0'>
                                <AvatarGroup max={3}>
                                    <Avatar sx={{ bgcolor: 'pink' }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                    <Avatar sx={{ bgcolor: 'green' }} alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                                    <Avatar sx={{ bgcolor: 'yellow' }} alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                    <Avatar sx={{ bgcolor: 'pink' }} alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                                    <Avatar sx={{ bgcolor: 'red' }} alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                                </AvatarGroup>
                            </div>

                            <div className='mb-4 sm:mb-0'>
                                <p className='text-sm sm:text-base'>boAt Immortal 131 with Beast Mode, (40 items)</p>
                            </div>

                            <div className='mb-4 sm:mb-0'>
                                ₹1,109
                            </div>
                        </Link>

                    )
                })}
            </div>

        </Layout>
    )
}

export default OrderSummery