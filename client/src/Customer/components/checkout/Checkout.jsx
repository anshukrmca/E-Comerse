import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useLocation } from 'react-router-dom';
import OrderSummery from './OrderSummery';
import DeleveryAddress from './DeleveryAddress';
import Layout from '../layout/Layout';
import Payment from './Payment'


const steps = ['Login', 'Delevery Address', 'Order Summary', 'Payment'];

export default function Checkout() {

  const location = useLocation()
  const querySerch = new URLSearchParams(location.search)
  const step = querySerch.get("step")

  return (
    <>
      <Layout>
        <div className='mb-4 mx-4 p-4 lg:px-20 bg-slate-300'>
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
                  {step == 2 ?
                    <DeleveryAddress /> :
                    step == 3 ?
                      <OrderSummery />
                      : step == 4 ?
                        <Payment />
                        : ''}
                </div>
          </Box>
        </div>
      </Layout>
    </>
  );
}