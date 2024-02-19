import { Button, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CardItem from '../cart/CardItem'
import { useSelector } from 'react-redux'
import { selectCart } from '../../../redux/features/cartSlice'
import HeaderTittle from '../HeaderTittle'
import { IoCloudDownloadOutline } from 'react-icons/io5'
import { selectUser } from '../../../redux/features/userSlice'
import { tokens } from '../../../theme'

const CartSummery = () => {
  const navigate = useNavigate()
  const cartData = useSelector(selectCart)
  const addressID = sessionStorage.getItem("addressID");
  const currentUser = useSelector(selectUser);
  const [address, setAddress] = useState()
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  useEffect(() => {
    const filterById = (addressID) => {
      const filteredData = currentUser && currentUser.Useraddress.filter(item => item._id === addressID);
      setAddress(filteredData)
    };
    if (addressID !== undefined) {
      filterById(addressID);
    }
  }, [addressID, currentUser])

  return (
    <div>

      <div className='mx-4' style={{backgroundColor:`${colors.primary[400]}`}}>
        <div className='mt-4'>
          <HeaderTittle tittle={"Order Summery"} />
        </div>
        {address && address.length !=0 && <div className='p-4 mt-4 mb-4 rounded-md shadow-md sm:mb-0 w-[auto]'>
          {
            address && address.map((item) => {
              return (
                <div key={item._id}>
                  <div className='flex flex-col sm:flex-row gap-3 font-semibold'>
                    <p>{item.name}</p>
                    <p>({item.mobile})</p>
                  </div>
                  <p className='text-sm'>
                  Street : {item.streetAddress}, City : {item.city}, State : {item.state}, Landmark : {item.landmarks},{item.zipCode}
                  </p>
                </div>
              )
            })
          }

        </div>}
      </div>
      <div className="md:flex justify-between m-4 gap-2">
        <div className='sm:w-3/4'>
          {cartData && cartData.cartItem.map((item, i) =>
            <CardItem key={i} item={item} />)}
        </div>
        <div>
          <div className="p-4 pb-6 min-w-80 h-[auto] sticky shadow-lg " style={{backgroundColor:`${colors.primary[400]}`}}>
            <p className="upppercase font-bold opacity-60 pb-4">
              Price Details
            </p>
            <hr />
            <div className="space-y-3 font-semibold ">
              <div className="flex justify-between pt-3">
                <span>Price</span>
                <span>₹{cartData && cartData.totalPrice}</span>
              </div>
              <div className="flex justify-between pt-3">
                <span>Discount</span>
                <span className="text-green-600">-₹{cartData && cartData.discounts}</span>
              </div>
              <div className="flex justify-between pt-3">
                <span>Shipping fee</span>
                <span className="text-green-600">free</span>
              </div>
              <hr />
              <div className="flex justify-between pt-3">
                <span>Total Amount</span>
                <span className="text-green-600">₹{cartData && cartData.totalDiscountedPrice}</span>
              </div>
            </div>
          </div>
          <div className="p-4 mt-2 min-w-80 h-[auto] sticky shadow-lg" style={{backgroundColor:`${colors.primary[400]}`}}>

            <Button
              onClick={() => { navigate(`/checkout/?step=3`) }}
              variant="contained"
              className="w-full"
              sx={{ mt: " 1rem", px: "2rem", py: ".7rem", bgcolor: "#9155fd" }}
            >Continue
            </Button>
            <Button
              onClick={() => { 
                sessionStorage.removeItem("addressID");
                navigate(`/checkout/?step=1`) }}
              variant="contained"
              className="w-full"
              sx={{ mt: " 1rem", px: "2rem", py: ".7rem", bgcolor: "#9155fd" }}
            >
              Back
            </Button>
          </div>
        </div>
      </div>




    </div>
  )
}

export default CartSummery