import { Button } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const paymentMode = [
  {
    id: 1,
    name: "UPI",
    paymentSubMode: [
      {
        id: "g-pay",
        name: "Goggle Pay"
      },
      {
        id: "g-pay",
        name: "Goggle Pay"
      }
    ]
  },
  {
    id: 1,
    name: "Credit / Debit / ATM Card ",
    paymentSubMode: [
      {
        id: "g-pay",
        name: "Goggle Pay"
      },
      {
        id: "g-pay",
        name: "Goggle Pay"
      }
    ]
  },
  {
    id: 1,
    name: "Wallets",
    paymentSubMode: [
      {
        id: "g-pay",
        name: "Goggle Pay"
      },
      {
        id: "g-pay",
        name: "Goggle Pay"
      }
    ]
  },
  {
    id: 1,
    name: "Cash On Delivery",
    paymentSubMode: [
      {
        id: "g-pay",
        name: "Goggle Pay"
      },
      {
        id: "g-pay",
        name: "Goggle Pay"
      }
    ]
  }
]

const UPI = () => {
  return (
    <div>
      <p className='text-[12px] font-semibold'>Choose an Option</p>
      <div className='flex gap-3 items-center mt-2'>
          <input
            type="radio"
            name="paymentSubMode"
            className='appearance-none cursor-pointer focus:outline-none border-2 border-gray-400 rounded-full w-4 h-4 checked:bg-indigo-600 checked:border-transparent'
          />
          <p className='text-[12px]'>COD</p>
        </div>

    </div>
  )
};

const WALLETS = () => {
  return (
    <div>
      <p>Choose an Option</p>
      wallets</div>
  )
};

const COD = () => {
  return (
    <div>
      <p>Choose an Option</p>
      cod</div>
  )
};

const CARD = () => {
  return (
    <div>
      <p>Choose an Option</p>
      card</div>
  )
};
const Payment = () => {
  const navigate = useNavigate()
  const [selectUPI, setSelectUPI] = useState(false)
  const [selectWALLETS, setSelectWALLETS] = useState(false)
  const [selectCOD, setSelectCOD] = useState(false)
  const [selectCARD, setSelectCARD] = useState(false)


  const handleChoosePaymentMode = async (selectedMode) => {
    if (selectedMode === "UPI") {
      setSelectUPI(true)
      setSelectWALLETS(false);
      setSelectCARD(false);
      setSelectCOD(false);
    } else if (selectedMode === "WALLTE") {
      setSelectUPI(false)
      setSelectWALLETS(true);
      setSelectCARD(false);
      setSelectCOD(false);
    }
    else if (selectedMode === "CARD") {
      setSelectUPI(false)
      setSelectWALLETS(false);
      setSelectCARD(true);
      setSelectCOD(false);
    }
    else if (selectedMode === "COD") {
      setSelectUPI(false)
      setSelectWALLETS(false);
      setSelectCARD(false);
      setSelectCOD(true);
    }
  }

  return (
    <div>
      <p>Choose Payment Mode</p>
      <div className='mb-4 bg-slate-300 dark:bg-gray-800 p-4'>
        <div className='flex gap-3'>
          <input
            type="radio"
            name="paymentMode"
            onClick={() => handleChoosePaymentMode("UPI")}
            className='appearance-none cursor-pointer focus:outline-none border-2 border-gray-400 rounded-full w-6 h-6 checked:bg-purple-600 checked:border-transparent'
          />
          <p>UPI</p>
        </div>
        <div className='mx-10 mt-2 px-3'>
          {selectUPI && <UPI />}
        </div>
      </div>
      <div className='mb-4 bg-slate-300 dark:bg-gray-800 p-4'>
        <div className='flex gap-3'>
          <input
            type="radio"
            name="paymentMode"
            onClick={() => handleChoosePaymentMode("WALLTE")}
            className='appearance-none cursor-pointer focus:outline-none border-2 border-gray-400 rounded-full w-6 h-6 checked:bg-purple-600 checked:border-transparent'
          />
          <p>WALLET</p>
        </div>
        <div className='mx-10 mt-2 px-3'>
          {selectWALLETS && <WALLETS />}
        </div>
      </div>
      <div className='mb-4 bg-slate-300 dark:bg-gray-800 p-4'>
        <div className='flex gap-3'>
          <input
            type="radio"
            name="paymentMode"
            onClick={() => handleChoosePaymentMode("CARD")}
            className='appearance-none cursor-pointer focus:outline-none border-2 border-gray-400 rounded-full w-6 h-6 checked:bg-purple-600 checked:border-transparent'
          />
          <p>CARD</p>
        </div>
        <div className='mx-10 mt-2 px-3'>
          {selectCARD && <CARD />}
        </div>
      </div>
      <div className='mb-4 bg-slate-300 dark:bg-gray-800 p-4'>
        <div className='flex gap-3'>
          <input
            type="radio"
            name="paymentMode"
            onClick={() => handleChoosePaymentMode("COD")}
            className='appearance-none cursor-pointer focus:outline-none border-2 border-gray-400 rounded-full w-6 h-6 checked:bg-purple-600 checked:border-transparent'
          />
          <p>COD</p>
        </div>
        <div className='mx-10 mt-2 px-3'>
          {selectCOD && <COD />}
        </div>
      </div>

      {/* <Button
        onClick={() => { navigate(`/checkout/?step=2`) }}
        variant="contained"
        className="w-full"
        sx={{ mt: " 1rem", px: "2rem", py: ".7rem", bgcolor: "#9155fd" }}
      >
        BAck
      </Button>
      <Button
        onClick={() => { alert("order confirmed") }}
        variant="contained"
        className="w-full"
        sx={{ mt: " 1rem", px: "2rem", py: ".7rem", bgcolor: "#9155fd" }}
      >
        Order Confirn
      </Button> */}
    </div>
  )
}

export default Payment