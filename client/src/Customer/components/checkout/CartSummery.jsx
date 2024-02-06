import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import CardItem from '../cart/CardItem'
import { useSelector } from 'react-redux'
import { selectCart } from '../../../redux/features/cartSlice'
import HeaderTittle from '../HeaderTittle'
import { IoCloudDownloadOutline } from 'react-icons/io5'

const CartSummery = () => {
  const navigate = useNavigate()
  const cartData = useSelector(selectCart)
  return (
    <div>
      <div className='mx-4'>
        <div className='p-4 mt-4 mb-4 rounded-md shadow-md sm:mb-0 bg-white dark:bg-gray-800 w-[auto]'>
          <div className='flex flex-col sm:flex-row gap-4 font-semibold'>
            <p>Anshu Kumar</p>
            <p>8210500193</p>
          </div>
          <p className='text-sm'>
            KKS Balaji Mens Hostel, 5, Lakshmikanthan St, Pondy Bazaar, Parthasarathi Puram, T. Nagar, Chennai,
            Tamil Nadu 600017, CHENNAI, Tamil Nadu - 600018
          </p>
        </div>
      </div>
      <div className="md:flex justify-between m-4 gap-2">
        <div className='sm:w-3/4'>
          {cartData && cartData.cartItem.map((item, i) =>
            <CardItem key={i} item={item} />)}
        </div>
        <div>
          <div className="p-4 pb-6 min-w-80 h-[auto] sticky shadow-lg bg-white dark:bg-gray-800">
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
          <div className="p-4 mt-2 min-w-80 h-[auto] sticky shadow-lg bg-white dark:bg-gray-800">
            
            <Button
              onClick={() => { navigate(`/checkout/?step=3`) }}
              variant="contained"
              className="w-full"
              sx={{ mt: " 1rem", px: "2rem", py: ".7rem", bgcolor: "#9155fd" }}
            >Make Payment
            </Button>
            <Button
              onClick={() => { navigate(`/checkout/?step=1`) }}
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