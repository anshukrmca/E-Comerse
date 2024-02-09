import React, { useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import { IoCloudDownloadOutline } from "react-icons/io5";
import { Link, useParams } from 'react-router-dom';
import { Avatar, AvatarGroup } from '@mui/material';
import HeaderTittle from '../HeaderTittle';
import { useSelector } from 'react-redux';
import { selectorder } from '../../../redux/features/orderSlice';

const OrderSummery = () => {

    const OrderItemData = useSelector(selectorder);
    const { orderid } = useParams();
    const [Order, setOrder] = useState('')

    console.log(Order)

    useEffect(() => {
        const filterById = (orderid) => {
            const filteredData = OrderItemData && OrderItemData.filter(item => item._id === orderid);
            setOrder(filteredData);
        };
        if (orderid !== undefined) {
            filterById(orderid);
        }
    }, [orderid, OrderItemData])



    return (
        <Layout>
            <div className='mx-4'>
                <HeaderTittle tittle="Order Details" />
                <div className='flex flex-col sm:flex-row items-center shadow-lg p-4 mb-4 dark:bg-slate-900 bg-slate-300'>
                    {
                        Order && Order.map((item, i) => {
                            return (
                                <div key={i} className='border-r border-gray-400 p-2 w-full sm:w-3/4 mb-4 sm:mb-0'>
                                    <div className='flex flex-col sm:flex-row gap-4 font-semibold'>
                                        <p>{item.shippingAddess.name}</p>
                                        <p>({item.shippingAddess.mobile})</p>
                                    </div>
                                    <p className='text-sm'>
                                        Street : {item.shippingAddess.streetAddress}, City : {item.shippingAddess.city}, State : {item.shippingAddess.state}, Landmark : {item.shippingAddess.landmarks},{item.shippingAddess.zipCode}
                                    </p>
                                </div>
                            )
                        })
                    }
                    <hr className='border-r border-gray-400 hidden sm:block' />
                    <div className='flex justify-center items-center p-2 w-full sm:w-1/4'>
                        <p className='text-center'>Download Invoice</p>
                        <IoCloudDownloadOutline size={30} className='hover:text-lime-600 mx-4 cursor-pointer' />
                    </div>
                </div>
            </div>

            <div className='mx-4 dark:bg-slate-800 bg-slate-300 px-4 py-2'>


                {Order && Order.map((item, i) => {
                    return (
                        <div key={i}>
                            {item.orderItem.map((item,i) => {
                               return(
                                <Link to='/order-summery' key={i} className='flex cursor-pointer flex-col sm:flex-row justify-between items-center shadow-sm hover:shadow-2xl p-4 mb-4 dark:bg-slate-900 bg-slate-300'>

                                <div className='mb-4 sm:mb-0'>
                                    <Avatar alt="Trevor Henderson" src={item.product.mainImage} />
                                </div>

                                <div className='mb-4 sm:mb-0'>
                                    <p className='text-sm sm:text-base'>{item.product.title}, ({item.quantity} items)</p>
                                </div>

                                <div className='mb-4 sm:mb-0'>
                                    ₹{item.product.discountedPrice}
                                </div>
                            </Link>
                               )
                            })
                            }
                        </div>

                    )
                })}
            </div>

        </Layout>
    )
}

export default OrderSummery


