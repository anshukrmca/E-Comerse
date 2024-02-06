import React, { useEffect } from "react";
import CardItem from "./CardItem";
import { Button } from "@mui/material";
import Layout from '../layout/Layout'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCart } from "../../../redux/features/cartSlice";

const Cart = () => {
  const navigate = useNavigate()
  const cartData = useSelector(selectCart)
  return (
    <>
      <Layout>
        {cartData && cartData.cartItem.length ? 
        <div className="lg:grid grid-cols-3 lg:px-16 relative h-full mx-4">
          <div className="col-span-2">
            {cartData && cartData.cartItem.map((item, i) =>
              <CardItem key={i} item={item} />)}
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
              <Button
                onClick={() => { navigate(`/checkout/?step=1`) }}
                variant="contained"
                className="w-full"
                sx={{ mt: " 1rem", px: "2rem", py: ".7rem", bgcolor: "#9155fd" }}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
        : 
        <div className="h-[80%]"> 
          <h2 className="text-center text-3xl">Empty Bag</h2>
        </div>
        }
      </Layout>
    </>
  );
};

export default Cart;
