import { Avatar, AvatarGroup, useTheme } from '@mui/material'
import HeaderTittle from '../HeaderTittle'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectorder } from '../../../redux/features/orderSlice'
import { tokens } from '../../../theme'

const OrderDetail = () => {
  const orderasd = useSelector(selectorder);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  const getMenuItemStyles = (status) => {
    switch (status) {
        case 'PLACED':
            return { backgroundColor: `${colors.redAccent[400]}` };
        case 'CONFIRMED':
            return { backgroundColor: 'cyan' };
        case 'SHIPPED':
            return { backgroundColor: 'purple' };
        case 'DELIVERED':
            return { backgroundColor: 'green' };
        case 'CANCELLED':
            return { backgroundColor: 'red' };
        default:
            return {};
    }
};

  return (
    <>
      <div>
        <HeaderTittle tittle="My Order" subtitle={"all order details"} />
        {orderasd && orderasd.map((item, i) => {
          return (
            <Link to={`/order-summery/${item._id}`} key={i} className='flex cursor-pointer flex-col sm:flex-row justify-between items-center shadow-lg p-4 mb-4' style={{backgroundColor:`${colors.primary[400]}`}}>

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
                  <div className='w-3 h-3 rounded-full mx-1' style={getMenuItemStyles(item.orderStatus)}/>
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