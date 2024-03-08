import { Avatar } from '@mui/material';
import React, { useRef } from 'react'
import { FaPrint } from 'react-icons/fa6';
import ReactToPrint from 'react-to-print';

const Invoice = ({ Order }) => {
    const PrintDiv = useRef();
    return (
        <>
            <div className="p-4 text-black bg-white shadow-md">
                <div className="p-8" ref={PrintDiv}>
                    <div className="text-center">
                        <h1 className="text-2xl font-bold">Invoice</h1>
                        <p className="text-sm text-gray-500">
                            Order Date: {
                                Order && Order.updatedAt
                                    ? new Date(Order.updatedAt).toLocaleString('en-US', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true,
                                    })
                                    : 'N/A'
                            }
                        </p>

                    </div>

                    {/* Customer Information */}
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold mb-2">Customer Information</h2>
                        <p>Name: {Order?.shippingAddess?.name}</p>
                        <p>Mobile: {Order?.shippingAddess?.mobile}</p>
                        <p>Address: {Order?.shippingAddess?.streetAddress}, {Order?.shippingAddess?.city}, {Order?.shippingAddess?.state} - {Order?.shippingAddess?.zipCode}</p>
                    </div>

                    {/* Order Details */}
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold mb-2">Order Details</h2>
                        <p>Order Status: {Order?.orderStatus}</p>
                        <p>Payment Method: {Order?.paymentDetails?.paymentMethod}</p>
                    </div>

                    {/* Product Details */}
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold mb-2">Product Details</h2>
                        {Order?.orderItem?.map((item, index) => (
                            <div key={index} className="flex items-center mb-4 p-4 border rounded-lg shadow-md">
                                <div className="flex-shrink-0 mr-4">
                                    <Avatar src={item.product?.mainImage} alt="Product Image" />
                                </div>
                                <div className="flex-grow">
                                    <p className="text-[12px] font-semibold">{item.product?.title}</p>
                                    <p className="text-gray-600">Size: {item.size}</p>
                                    <p className="text-gray-600">Price: ${item.price - item.discountedprice}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
                        <p>Total Items: {Order?.totalItem}</p>
                        <p>Total Price: ${Order?.totalPrice}</p>
                        <p>Discounts: ${Order?.discounts}</p>
                        <p className='font-bold'>Total Payable Price: ${Order?.totalDiscountPrice}</p>
                    </div>
                </div>
                <ReactToPrint
                    trigger={() => (
                        <a href="#" className='flex items-center justify-center gap-3 bg-indigo-800 p-2 rounded-lg text-white font-bold'>Print this out! <FaPrint size={25}/></a>
                    )}
                    content={() => PrintDiv.current}
                />
            </div>
        </>
    );
};

export default Invoice