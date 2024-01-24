import React from "react";
import CardItem from "./CardItem";
import { Button } from "@mui/material";
import Layout from '../layout/Layout'
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate()
  return (
    <>
     <Layout>
     <div className="lg:grid grid-cols-3 lg:px-16 relative h-full mx-4">
        <div className="col-span-2">
          {[1,1,1,1].map((item,i)=><CardItem key={i}/>)}
        </div>
        <div className="px-5 sticky top-0 mt-5 lg:mt-0 mb-4">
        <div className="p-4 bg-white dark:bg-gray-800 mb-4">
            <p className="upppercase font-bold opacity-60 pb-4">
              Add Coupon code
            </p>
            <hr />
            <div className="space-y-3 font-semibold ">
              <input type="text" placeholder="coupon code"
              className='bg-gray-200 mt-2 dark:bg-gray-500 p-3 outline-none w-full h-10 rounded-lg'
              />
            </div>
            <Button
              variant="contained"
              className="w-full"
              sx={{ mt: " 1rem", px: "2rem", py: ".4rem", bgcolor: "#9155fd" }}
            >
              Apply
            </Button>
          </div>
          <div className=" p-4 bg-white dark:bg-gray-800">
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
            <Button
            onClick={()=>{navigate(`/checkout/?step=1`)}}
              variant="contained"
              className="w-full"
              sx={{ mt: " 1rem", px: "2rem", py: ".7rem", bgcolor: "#9155fd" }}
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
     </Layout>
    </>
  );
};

export default Cart;
