import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Payment = () => {
  const navigate = useNavigate()
  return (
    <div>Payment

      <Button
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
      </Button>
    </div>
  )
}

export default Payment