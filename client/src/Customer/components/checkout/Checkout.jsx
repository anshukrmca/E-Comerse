import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useLocation } from 'react-router-dom';
import CartSummery from './CartSummery';
import DeleveryAddress from './DeleveryAddress';
import Layout from '../layout/Layout';
import Payment from '../paymentMode/Payment'
import { useState } from 'react';


const steps = ['Address', 'Summary', 'Payment'];

export default function Checkout() {

  const location = useLocation()
  const querySerch = new URLSearchParams(location.search)
  const step = querySerch.get("step")

  return (
    <>
      <Layout>
        <div className='mb-4 pt-8 mx-4 p-1 lg:px-20 dark:bg-slate-800 bg-slate-300'>
          <Box sx={{ width: '100%' }}>
            <Stepper activeStep={step}>
              {steps.map((label, index) => {
                return (
                  <Step key={index}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
                <div>
                  {step == 1 ?
                    <DeleveryAddress/> :
                    step == 2 ?
                      <CartSummery/>
                      : step == 3 ?
                        <Payment/>
                        : ''}
                </div>
          </Box>
        </div>
      </Layout>
    </>
  );
}