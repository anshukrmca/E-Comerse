import axios from 'axios';
import React, { useState } from 'react'
import { SlOptionsVertical } from 'react-icons/sl'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddressCard = ({ index, item, fetchData, setIsFormOpen, setId }) => {
  const [isDrOpen, setIsDrOpen] = useState({});
  const toggleDropdown = (index) => {
    setIsDrOpen((prevStates) => ({
      ...prevStates,
      [index]: !prevStates[index],
    }));
  };

  const handleDelete = async (AddressId) => {
    const res = await axios.delete(`/api/address/deleteAddress/${AddressId}`)
    fetchData();
    toast.success(res)
    console.log(res.data);
  }

  const OptionDropdown = ({ AddressId }) => {
    return (
      <div
        className="absolute -top-10 right-6  w-20 rounded-lg mt-12 bg-slate-300 dark:bg-slate-800 p-2 shadow-lg "
      >
        <div className="py-1">
          <Link
            style={{ textDecoration: "none" }}
            className="flex cursor-pointer items-center p-2 rounded-sm text-sm  hover:bg-gray-200 dark:hover:bg-slate-600"
          >
            <span onClick={() => {
              setIsFormOpen(true)
              setId(AddressId)
            }}>Edit</span>
          </Link>
          <Link onClick={() => { handleDelete(AddressId) }}
            style={{ textDecoration: "none" }}
            className="flex cursor-pointer items-center p-2 rounded-sm text-sm  hover:bg-gray-200 dark:hover:bg-slate-600"
          >
            <span className="" >Delete</span>
          </Link>

        </div>
      </div>
    );
  };


  return (
    <div>
      <div className='flex justify-between items-center p-4  dark:bg-slate-900 bg-slate-300'>
        <div>
          <div className='flex gap-4 font-semibold'>
            <p>{item.name}</p>
            <p>{item.mobile}</p>
          </div>
          <p>
            {item.streetAddress} , {item.city} , {item.state} , {item.zipCode}
          </p>
          <p><span className='font-bold'>Land Mark :</span> {item.landmarks}</p>
        </div>
        {index !== undefined && <div onClick={() => { toggleDropdown(index) }} className='relative'>
          <SlOptionsVertical className='cursor-pointer' />
          {isDrOpen[index] && <OptionDropdown AddressId={item._id} />}
        </div>}
      </div>
    </div>
  )
}

export default AddressCard