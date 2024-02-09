import { Avatar, AvatarGroup } from '@mui/material'
import HeaderTittle from '../HeaderTittle'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectorder } from '../../../redux/features/orderSlice'

const OrderDetail = () => {
  const orderasd = useSelector(selectorder);
  
  return (
    <>
      <div>
        <HeaderTittle tittle="My Order" />
        {orderasd && orderasd.map((item, i) => {
          return (
            <Link to={`/order-summery/${item._id}`} key={i} className='flex cursor-pointer flex-col sm:flex-row justify-between items-center shadow-lg p-4 mb-4 dark:bg-slate-900 bg-slate-300'>

              <div className='mb-4 sm:mb-0'>
              {item.orderItem && <AvatarGroup max={3}>
                {item && item.orderItem.map((PImg,i)=>{
                 return(
                  <Avatar key={i} alt="Trevor Henderson" src={PImg?.product.mainImage}/>
                 )
                })}
                
              </AvatarGroup>}
              </div>

              {/* <div className='mb-4 sm:mb-0'>
            <p className='text-sm sm:text-base'>boAt Immortal 131 with Beast Mode, (40 items)</p>
          </div> */}

              <div className='mb-4 sm:mb-0'>
                ₹{item.totalDiscountPrice}
              </div>

              <div>
                <div className='flex items-center mb-1'>
                  <div className='bg-green-600 w-3 h-3 rounded-full mx-1' />
                  {item.orderStatus}
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