import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AddressCard from './AddressCard'
import axios from 'axios'
import { GiReturnArrow } from "react-icons/gi";

const DeleveryAddress = () => {
  const navigate = useNavigate()
  const [addressesData, setAddressesData] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isBtnOpen, setIsBtnOpen] = useState({});

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


  const handleChooseAddress = (addressId, i) => {
    // Toggle the state for the clicked button
    setIsBtnOpen((prevStates) => ({
      ...prevStates,
      [i]: !prevStates[i],
    }));

    // Close the first button if it's open and it's not the currently clicked button
    if (selectedAddress && selectedAddress !== addressId) {
      const indexOfFirstButton = addressesData.findIndex((item) => item._id === selectedAddress);
      setIsBtnOpen((prevStates) => ({
        ...prevStates,
        [indexOfFirstButton]: false,
      }));
    }

    // Update the selected address
    setSelectedAddress(addressId);

  };
  return (
    <>
      <div className='w-full mt-4 mb-4 md:mb-0 p-4 '>
        <p className='cursor-pointer w-28 flex items-center mb-2' onClick={() => { navigate(`/cart`) }}><GiReturnArrow size={25} className='mr-2' />Go Back</p>
        {addressesData.map((item, i) => (
          <div key={i} className='bg-slate-300 dark:bg-gray-800 shadow-lg flex items-center p-4 mb-2 rounded-md' >
            <input
              type='radio'
              id={item._id}
              name='addressSelection'
              className='appearance-none cursor-pointer focus:outline-none border-2 border-gray-400 rounded-full w-6 h-6 checked:bg-purple-600 checked:border-transparent'
              onClick={() => handleChooseAddress(item._id, i)}
              defaultChecked={selectedAddress === item._id}
            />
            <div className='w-full mb-4 bg-transparent'>
              <AddressCard item={item} />
            </div>
            {isBtnOpen[i] && (
              <button
                className='w-48 p-2 rounded-md bg-slate-500'
                onClick={() => {
                  // Handle the action when the button is clicked for the selected address
                  console.log('Button clicked for address:', selectedAddress);
                  navigate(`/checkout/?step=2`)
                }}
              >
                Deliver Here
              </button>
            )}
          </div>
        ))}
      </div >
    </>
  )
}

export default DeleveryAddress