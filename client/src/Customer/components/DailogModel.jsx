import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Login from './Auth/Login'
import { useLocation } from 'react-router-dom';
import Signup from './Auth/Signup';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 270,
  bgcolor: 'background.paper',
  outline:'none',
  boxShadow: 24,
  p:4,
};

export default function DailogModel({modelopen,handleCloseModel}) {
  const location=useLocation()

  return (
    <div>
      
      <Modal
        open={modelopen}
        onClose={handleCloseModel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {location.pathname === "/login" ? <Login/> : <Signup/>}
        </Box>
      </Modal>
    </div>
  );
}
