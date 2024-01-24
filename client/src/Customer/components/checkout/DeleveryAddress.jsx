import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AddressCard from './AddressCard'
import axios from 'axios'

const DeleveryAddress = () => {
  const navigate = useNavigate()
  const [addressesData, setAddressesData] = useState([]);

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

  const handleChooseAddress = async (id) => {
    alert(id);
    navigate(`/checkout/?step=2`);
  }
  return (
    <>
      <div className='flex flex-col md:flex-row justify-between mx-2 md:mx-4 mt-4 p-3'>
        <div className='w-full shadow-lg md:w-3/4 mb-4 md:mb-0 '>
          {addressesData.map((item, i) => {
            return (
              <div key={i} onClick={() => { handleChooseAddress(item._id) }} className=' mb-4 dark:bg-slate-900 bg-slate-300 items-center'>
                <AddressCard item={item} />
              </div>
            )
          })}
        </div >
        <div className='w-full md:w-1/4 flex flex-col items-center p-2'>
          <Button
            onClick={() => { navigate(`/cart`) }}
            variant="contained"
            sx={{ mt: "1rem", px: "2rem", py: ".3rem", bgcolor: "#9155fd" }}
          >
            Back to cart
          </Button>
        </div>
      </div>

    </>
  )
}

export default DeleveryAddress