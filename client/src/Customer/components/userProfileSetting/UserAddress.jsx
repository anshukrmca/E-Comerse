import React, { useEffect, useState } from 'react'
import HeaderTittle from '../HeaderTittle'
import AddressFrom from '../From/AddressFrom';
import axios from 'axios';
import AddressCard from '../checkout/AddressCard';


const UserAddress = () => {
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [addressesData, setAddressesData] = useState([]);
  const [id,setId] = useState("")


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



 
  return (
    <>
      <div>
        <HeaderTittle tittle="Manage Addresses" subtitle={"all address   details"}/>
        <div className=' p-3 border border-gray-400 mb-4'>
          <div onClick={() => { setIsFormOpen(!isFormOpen) }}
            className='font-bold cursor-pointer dark:bg-slate-900 bg-slate-300 p-2'> + Add New Address</div>
          <div className='mt-2'>
            {isFormOpen && <AddressFrom closeForm={closeForm} AddressId={id}/>}
          </div>
        </div>
        {addressesData.length != 0 ?
          <div className='p-3 border border-gray-400'>
            {addressesData.map((item, i) => {
              return (
                <AddressCard key={i} index={i} item={item} setId={setId} fetchData={fetchData} setIsFormOpen={setIsFormOpen}/>
              )
            })}
          </div>
          : ''}

      </div>
    </>
  )
}

export default UserAddress