import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import CardItem from '../cart/CardItem'

const CartSummery = () => {
  const navigate = useNavigate()
  return (
    <div>

      <div className="md:flex justify-between m-4 gap-2">
        <div className='sm:w-3/4'>
          {[1, 1, 1, 1].map((item, i) => <CardItem key={i} />)}
        </div>
        <div className="p-4 sm:w-1/4 md-w-full h-80 sticky shadow-lg bg-white dark:bg-gray-800">
          <p className="upppercase font-bold opacity-60 pb-4">
            Price Details
          </p>
          <hr />
          <div className="space-y-3 font-semibold ">
            <div className="flex justify-between pt-3">
              <span>Price</span>
              <span>₹1,399</span>
            </div>
            <div className="flex justify-between pt-3">
              <span>Discount</span>
              <span className="text-green-600">-₹1,599</span>
            </div>
            <div className="flex justify-between pt-3">
              <span>Shipping fee</span>
              <span className="text-green-600">free</span>
            </div>
            <hr />
            <div className="flex justify-between pt-3">
              <span>Total</span>
              <span className="text-green-600">₹1,399</span>
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={() => { navigate(`/checkout/?step=1`) }}
        variant="contained"
        className="w-full"
        sx={{ mt: " 1rem", px: "2rem", py: ".7rem", bgcolor: "#9155fd" }}
      >
        Back
      </Button>

      <Button
        onClick={() => { navigate(`/checkout/?step=3`) }}
        variant="contained"
        className="w-full"
        sx={{ mt: " 1rem", px: "2rem", py: ".7rem", bgcolor: "#9155fd" }}
      >Make Payment
      </Button>
    </div>
  )
}

export default CartSummery