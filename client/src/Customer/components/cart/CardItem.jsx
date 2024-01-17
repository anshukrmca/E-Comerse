import { Button, IconButton } from "@mui/material";
import React from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoMdRemoveCircleOutline } from "react-icons/io";

const CardItem = () => {
  return (
    <>
      <div className="p-5 shadow-lg rounded-md mb-2 bg-white dark:bg-gray-800">
        <div className="flex items-center">
          <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
            <img
              className="w-full h-full object-cover object-top"
              src="https://assets.ajio.com/medias/sys_master/root/20230906/PEFh/64f8f7e1ddf7791519bc9574/-473Wx593H-443013606-black-MODEL.jpg"
              alt=""
            />
          </div>
          <div className="ml-5 space-y-1">
            <p className="font-semibold">Quilted Regular Fit Bomber Jacket</p>
            <p className="opacity-50">Size: L , White</p>
            <p className="opacity-70 mt-2">Seller : Fit Bomber Jacket</p>
            <div className="flex space-x-5 items-center pt-6">
              <p className="font-semibold">₹1,399</p>
              <p className="opacity-50 line-through">₹1,599</p>
              <p className="text-green-600 font-semibold">(10% off)</p>
            </div>

            <div className="lg:flex items-center lg:space-x-10">
              <div className="flex items-center space-x-2">
                <IconButton sx={{color:"RGB(145 85 253)"}}>
                  <IoMdRemoveCircleOutline />
                </IconButton>
                <span className="py-1 px-7 border rounded-sm border-black dark:border-gray-400">3</span>
                <IconButton sx={{color:"RGB(145 85 253)"}}>
                  <IoMdAddCircleOutline />
                </IconButton>
              </div>
              <div>
                <Button sx={{color:"RGB(145 85 253)"}}>remove</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardItem;
