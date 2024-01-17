import React from "react";
import CardItem from "./CardItem";
import { Button } from "@mui/material";
import Layout from '../layout/Layout'

const Cart = () => {
  return (
    <>
     <Layout>
     <div className="lg:grid grid-cols-3 lg:px-16 relative">
        <div className="col-span-2">
          {[1,1,1,1].map((item)=><CardItem />)}
        </div>
        <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0 ">
          <div className="border p-4 bg-white dark:bg-gray-800">
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
