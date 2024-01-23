import React, { useEffect, useState } from 'react'
import { SlOptionsVertical } from "react-icons/sl";
import { Link } from 'react-router-dom';
import HeaderTittle from '../HeaderTittle'
import AddressFrom from '../From/AddressFrom';
import axios from 'axios';
import { toast } from 'react-toastify';


const UserAddress = () => {
  const [isDrOpen, setIsDrOpen] = useState({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [addressesData, setAddressesData] = useState([]);
  const [id,setId] = useState("")

  const toggleDropdown = (index) => {
    setIsDrOpen((prevStates) => ({
      ...prevStates,
      [index]: !prevStates[index],
    }));
  };

  const closeForm = () => {
    setIsFormOpen(false)
    setId("");
  }

  // get all address fro current User 
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/address/allAddressbyUser');
      setAddressesData(response.data.address);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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
            <span onClick={()=>{
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
    <>
      <div>
        <HeaderTittle tittle="Manage Addresses" />
        <div className=' p-3 border border-gray-400 mb-4'>
          <div onClick={() => { setIsFormOpen(!isFormOpen) }}
            className='font-bold cursor-pointer dark:bg-slate-800 bg-slate-300 p-2'> + Add New Address</div>
          <div className='mt-2'>
            {isFormOpen && <AddressFrom closeForm={closeForm} AddressId={id}/>}
          </div>
        </div>
        {addressesData.length != 0 ?
          <div className='p-3 border border-gray-400'>
            {addressesData.map((item, i) => {
              return (
                <div key={i} className='flex justify-between items-center shadow-lg p-4 mb-4 dark:bg-slate-900 bg-slate-300'>
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
                  <div onClick={() => { toggleDropdown(i) }} className='relative'>
                    <SlOptionsVertical className='cursor-pointer' />
                    {isDrOpen[i] && <OptionDropdown AddressId={item._id} />}
                  </div>
                </div>
              )
            })}
          </div>
          : ''}

      </div>
    </>
  )
}

export default UserAddress