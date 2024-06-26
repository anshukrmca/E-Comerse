import React, { useState } from 'react'
import { FaCheck } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { GoHeartFill, GoHeart } from "react-icons/go";
import { Link } from 'react-router-dom';
import './Product.css'


const ProductCard = ({ Kid, P_id, P_name, description, price, color, image,discountedPrice,discountedPercentage }) => {
  const [isAddwishList, setIsAddwishList] = useState(false)
  const id  = P_id;

  const handleAddToWish = () => {
    setIsAddwishList(true)
    setTimeout(() => {
      setIsAddwishList(false)
    }, 2000) // Reset success message after 2 seconds
  }


  return (
    <>

      <div className=" productCard mb-4" key={Kid}>
        <div className="p-4 rounded shadow  group">
          <div className="block mb-2" href="#">
            <div className="relative overflow-hidden">
              <div className="mb-5 overflow-hidden h-[20rem]">
                <img className="object-cover w-full mx-auto transition-all rounded h-full group-hover:scale-110"
                  src={image}
                  alt="Product image" />
              </div>
              <div className="absolute flex flex-col top-4 right-4">
                <div
                  onClick={handleAddToWish}
                  className={`cursor-pointer p-2 mb-3 transition-all translate-x-20 rounded group-hover:translate-x-0   group ${isAddwishList ? 'bg-slate-300 transition duration-500' : 'bg-slate-300'}`}>
                  {isAddwishList ? <GoHeartFill size={23} className='text-red-600 size={20}' /> : <GoHeart size={20} />}
                </div>
              </div>
            </div>
           <div className='textPart'>
           <Link to={`/products/${id}`}>
              <h3 className="mb-2 text-xl font-bold ">{P_name.slice(0, 15)}</h3>
              <p className="text-[13px] mb-4 truncate-1-lines">
                {description.slice(0, 55)}
                <span className='bg-gray-300/50 rounded-lg mx-2 px-2 pb-1 cursor-pointer hover:text-black'>
                  ...view more
                </span>
              </p>
              <div className='flex justify-between items-center mb-4'>
                <p className="text-lg font-bold text-blue-500 dark:text-blue-300 ">
                <span className='text-2xl font-semibold'>₹{discountedPrice}</span>&nbsp;<span className='line-through'>{price}</span>&nbsp;<span className='text-green-400 text-sm'>{discountedPercentage}%</span>
                </p>
                <div className="flex space-x-2">
                  {
                    color.slice(0,4).map((color, index) => {
                      return (
                        <div key={index} style={{ backgroundColor: color.value }} className="w-6 h-6 rounded-full" title={color}></div>
                      )
                    })
                  }
                </div>
              </div>
            </Link>
           </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default ProductCard