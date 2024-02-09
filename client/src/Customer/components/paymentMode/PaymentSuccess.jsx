import React, { useEffect } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import Layout from '../layout/Layout'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccess = () => {
    const { orderid, paymentid } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        const updatePayment = async () => {
            try {
                if (paymentid) {
                    const resData = {
                        paymentID: paymentid,
                        ProductorderID: orderid
                    };

                    const response = await axios.post("/api/payment/update", resData);
                    console.log(response.data.orderData);
                }
            } catch (error) {
                console.error('Error updating payment:', error);
            }
        };

        updatePayment();
    }, [paymentid, orderid]);
    return (
        <>
            <Layout>

                <div className="flex items-center justify-center bg-green-500/30 rounded-lg mx-auto  my-4 p-4 w-[30rem]">
                    <div className="text-center">
                        <FaCheckCircle className="text-green-500 text-6xl mb-4 mx-auto" />
                        <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
                        <div className='my-2'>
                            <p><span className='font-semibold'>Order Id : </span>{orderid}</p>
                            <p><span className='font-semibold'>Payment Id : </span>{paymentid}</p>
                        </div>
                        <p>Thank you for your purchase.</p>
                        <button className='bg-green-500 my-4 p-2 rounded-md'
                        onClick={()=>{navigate('/')}}>&#128073; Continue shoping</button>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default PaymentSuccess