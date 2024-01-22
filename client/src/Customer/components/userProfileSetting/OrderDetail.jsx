import { Avatar, AvatarGroup } from '@mui/material'
import React from 'react'
import HeaderTittle from '../HeaderTittle'
import { Link } from 'react-router-dom'

const OrderDetail = () => {
  return (
    <>
     <div>
     <HeaderTittle tittle="My Order"/>
      {[1,1,1,1,1,1,1].map((item,i)=>{
        return(
          <Link to='/order-summery' key={i} className='flex cursor-pointer flex-col sm:flex-row justify-between items-center shadow-lg p-4 mb-4 dark:bg-slate-900 bg-slate-300'>
            
          <div className='mb-4 sm:mb-0'>
            <AvatarGroup max={3}>
              <Avatar sx={{ bgcolor: 'pink' }} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Avatar sx={{ bgcolor: 'green' }} alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              <Avatar sx={{ bgcolor: 'yellow' }} alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
              <Avatar sx={{ bgcolor: 'pink' }} alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
              <Avatar sx={{ bgcolor: 'red' }} alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
            </AvatarGroup>
          </div>
        
          <div className='mb-4 sm:mb-0'>
            <p className='text-sm sm:text-base'>boAt Immortal 131 with Beast Mode, (40 items)</p>
          </div>
        
          <div className='mb-4 sm:mb-0'>
            ₹1,109
          </div>
        
          <div>
            <div className='flex items-center mb-1'>
              <div className='bg-green-600 w-3 h-3 rounded-full mx-1' />
              Delevery on Jan 09
            </div>
            <p className='font-thin text-xs sm:text-sm'>Your item has been delivered</p>
          </div>
        
        </Link>
        
        )
      })}
     </div>
    </>
  )
}

export default OrderDetail