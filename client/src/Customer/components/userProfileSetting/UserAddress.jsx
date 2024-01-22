import React, { useState } from 'react'
import { SlOptionsVertical } from "react-icons/sl";
import { Link } from 'react-router-dom';
import HeaderTittle from '../HeaderTittle'
import AddressFrom from '../From/AddressFrom';


const UserAddress = () => {
  const [isDrOpen, setIsDrOpen] = useState({});
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleDropdown = (index) => {
    setIsDrOpen((prevStates) => ({
      ...prevStates,
      [index]: !prevStates[index],
    }));
  };

  const OptionDropdown = ({ index }) => {
    return (
      <div
        className="absolute -top-10 right-6  w-20 rounded-lg mt-12 bg-slate-300 dark:bg-slate-800 p-2 shadow-lg "
      >
        <div className="py-1">
          <Link onClick={() => { alert(index) }}
            style={{ textDecoration: "none" }}
            className="flex cursor-pointer items-center p-2 rounded-sm text-sm  hover:bg-gray-200 dark:hover:bg-slate-600"
          >
            <span className="">Edit</span>
          </Link>
          <Link
            style={{ textDecoration: "none" }}
            className="flex cursor-pointer items-center p-2 rounded-sm text-sm  hover:bg-gray-200 dark:hover:bg-slate-600"
          >
            <span className="">Delete</span>
          </Link>

        </div>
      </div>
    );
  };

  const closeForm = ()=>{
    setIsFormOpen(false)
  }

  return (
    <>
      <div>
        <HeaderTittle tittle="Manage Addresses" />
        <div className=' p-3 border border-gray-400 mb-4'>
          <div onClick={()=>{setIsFormOpen(!isFormOpen)}}
          className='font-bold cursor-pointer dark:bg-slate-800 bg-slate-300 p-2'> + Add New Address</div>
          <div className='mt-2'>
           {isFormOpen && <AddressFrom closeForm={closeForm}/>}
          </div>
        </div>
        <div className=' p-3 border border-gray-400'>
          {[1, 1, 1, 1, 1].map((item, i) => {
            return (
              <div key={i} className='flex justify-between items-center shadow-lg p-4 mb-4 dark:bg-slate-900 bg-slate-300'>
                <div>
                  <div className='flex gap-4 font-semibold'>
                    <p>Anshu Kumar</p>
                    <p>8210500193</p>
                  </div>
                  <p>
                    KKS Balaji Mens Hostel, 5, Lakshmikanthan St, Pondy Bazaar, Parthasarathi Puram, T. Nagar, Chennai, Tamil Nadu 600017, CHENNAI, Tamil Nadu - 600018
                  </p>
                </div>
                <div onClick={() => { toggleDropdown(i) }} className='relative'>
                  <SlOptionsVertical  className='cursor-pointer' />
                  {isDrOpen[i] && <OptionDropdown index={i} />}
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </>
  )
}

export default UserAddress