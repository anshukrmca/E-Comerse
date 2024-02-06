import { Button, IconButton } from "@mui/material";
import axios from "axios";
import React from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUserCart } from "../../../redux/features/cartSlice";

const CardItem = ({ item }) => {

  const dispatch = useDispatch();
  const handleRemoveToCart = async (cartItemId) => {
    try {
      const response = await axios.delete(`/api/cartItem/${cartItemId}`);
      dispatch(getUserCart());
      toast.error(response.data.message);

    } catch (error) {
      console.log(error)
    }
  }

  const  handleupdate= async(num)=>{
    const data={
      cartItemId:item._id,
      quantity: parseInt(item.quantity, 10) + num,
    }
    const res  = await axios.put("/api/cartItem",data);
    dispatch(getUserCart())
    toast.success(res.data.message);

  }
  return (
    <>
      <div className="p-5 shadow-lg rounded-md mb-2 bg-white dark:bg-gray-800">
        <div className="flex items-center">
          <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
            <img
              className="w-full h-full object-cover object-top"
              src={item.product.mainImage}
              alt="product image"
            />
          </div>
          <div className="ml-5 space-y-1">
            <p className="font-semibold">{item.product.title}</p>
            <p className="opacity-50">Size: {item.size} , {item.color}</p>
            <p className="opacity-70 mt-2">Seller : Fit Bomber Jacket</p>
            <div className="flex space-x-5 items-center pt-6">
              <p className="font-semibold">₹{item.product.discountedPrice}</p>
              <p className="opacity-50 line-through">₹{item.product.price}</p>
              <p className="text-green-600 font-semibold">({item.product.discountedPercentage}%)</p>
            </div>

            <div className="flex items-center lg:space-x-10">
              <div className="flex items-center space-x-2">
                <IconButton sx={{ color: "RGB(145 85 253)" }}
                 disabled={item.quantity <= 1} 
                 onClick={()=>{handleupdate(-1)}}>
                  <IoMdRemoveCircleOutline />
                </IconButton>
                <span className="py-1 px-7 border rounded-sm border-black dark:border-gray-400">{item.quantity}</span>
                <IconButton sx={{ color: "RGB(145 85 253)" }}  onClick={()=>{handleupdate(1)}}>
                  <IoMdAddCircleOutline />
                </IconButton>
              </div>
              <div>
                <Button sx={{ color: "RGB(145 85 253)" }} onClick={() => { handleRemoveToCart(item._id) }}>remove</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardItem;
