import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const DeleveryAddress = () => {
  const navigate = useNavigate()
  return (
    <div>DeleveryAddress
     
      <Button
        onClick={() => { navigate(`/checkout/?step=3`) }}
        variant="contained"
        className="w-full"
        sx={{ mt: " 1rem", px: "2rem", py: ".7rem", bgcolor: "#9155fd" }}
      >
        Add Address
      </Button>
    </div>
  )
}

export default DeleveryAddress