import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Login from './Auth/Login'
import { useLocation } from 'react-router-dom';
import Signup from './Auth/Signup';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme';



export default function DailogModel({modelopen,handleCloseModel}) {
  const location=useLocation()
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 270,
    bgcolor: colors.primary[400],
   //color:colors.grey[200],
    outline:'none',
    boxShadow: 24,
    p:4,
  };


  return (
    <div>
      
      <Modal
        open={modelopen}
        onClose={handleCloseModel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {location.pathname === "/signup" ? <Signup/> : <Login/>}
        </Box>
      </Modal>
    </div>
  );
}
