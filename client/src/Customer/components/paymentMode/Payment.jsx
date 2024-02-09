import React, { useEffect, useState } from 'react'
import PaymentTypeCard from './PaymentTypeCard'
import { Button } from '@mui/material'
import { GiCash, GiReturnArrow } from "react-icons/gi";
import { SiRazorpay } from "react-icons/si";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'

const Payment = () => {
  const navigate = useNavigate()
  const [paymentMethod, setpaymentMethod] = useState("")
  const shippingAddess = sessionStorage.getItem("addressID");
  const [paymentID,setPaymentID]=useState('')
  const [ProductorderID,setProductorderID]=useState('')



  useEffect(()=>{

    if(paymentID){
      navigate(`/payment/order/${ProductorderID}/payment/${paymentID}`);
    }
  },[paymentID])

  const handleOrder = async () => {
    if (!shippingAddess) {
      toast.error("Plz Choose Delivery Address")
    } else {
      const orderData = {
        paymentMethod: paymentMethod,
        shippingAddess: shippingAddess
      }
      const response = await axios.post('/api/orders', orderData)
      sessionStorage.removeItem("addressID");
      if(response.data.paymentDetails.paymentMethod === "Pay with Razorpay"){
       payment(response.data._id);
       setProductorderID(response.data._id);
      }else{
        toast.success("Order are Placed");
        setTimeout(() => {
          navigate('/')
        }, 2000);
      }
    }
  };

  const payment=async(orderId)=>{
    try {
			const response = await axios.post('/api/payment',{ orderId: orderId });
			initPayment(response.data.paymentDetails);
      
		} catch (error) {
			console.log(error);
		}
  };

  const initPayment = (paymentDetails) => {
		const options = {
			key: import.meta.env.VITE_APIKEY,
			amount: paymentDetails.amount,
			currency: paymentDetails.currency,
			description: "Test Transaction",
			order_id: paymentDetails.id,
			handler: async (response) => {
				try {
					const verifyUrl = "/api/payment/verify";
					const serverResponse = await axios.post(verifyUrl, response);
          if (serverResponse.data.paymentVerified.success === true) {
            setPaymentID(serverResponse.data.paymentVerified.paymentId);
           
          } 
				} catch (error) {
					console.log(error);
				}
			}
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};

  return (
    <>
      <div className='mt-5 p-4'>
        <p className='cursor-pointer w-28 flex items-center mb-2' onClick={() => {navigate(`/checkout/?step=2`) }}><GiReturnArrow size={25} className='mr-2' />Go Back</p>
        <div className='mt-4 mb-4'>
          <h3>Choose Payment Method</h3>
          <PaymentTypeCard setpaymentMethod={setpaymentMethod} tittle="Cash On Delivery" icon={<GiCash size={30} className='text-green-600' />} />
          <PaymentTypeCard setpaymentMethod={setpaymentMethod} tittle="Pay with Razorpay" icon={<SiRazorpay size={30} className='text-[#0D94FB]' />} />
          <Button
            disabled={paymentMethod === ""}
            onClick={() => handleOrder()}
            variant="contained"
            className="w-48"
            sx={{ mt: " 1rem", px: "2rem", py: ".7rem", bgcolor: "#9155fd" }}
          >Checkout
          </Button>
        </div>

      </div>

    </>
  )
}

export default Payment