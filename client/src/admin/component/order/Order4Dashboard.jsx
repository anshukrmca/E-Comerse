import React, { useEffect, useState } from 'react'
import HeaderTittle from '../../../Customer/components/HeaderTittle'
import { useDispatch, useSelector } from 'react-redux';
import { getAdminOrder, selectorders } from '../../../redux/features/adminOrderSlice';
import { useTheme } from '@mui/material';
import { tokens } from '../../../theme';
import { Link } from 'react-router-dom';

const Order4Dashboard = () => {
  const adminOrderss = useSelector(selectorders);
  const token = localStorage.getItem("token");
  const [order, setOrder] = useState("")
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  useEffect(() => {
    if (token) {
      try {
        dispatch(getAdminOrder());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

  }, [token])

  useEffect(() => {
    if (adminOrderss) {
      setOrder(adminOrderss);
    }
  }, [])

  const getMenuItemStyles = (status) => {
    switch (status) {
      case 'PLACED':
        return { color: `${colors.redAccent[400]}`  };
      case 'CONFIRMED':
        return { color: 'cyan' };
      case 'SHIPPED':
        return { color: 'purple' };
      case 'DELIVERED':
        return { color: 'green' };
      case 'CANCELLED':
        return { color: 'red' };
      default:
        return {};
    }
  };

  return (
    <>
      <HeaderTittle tittle={"Order Details"} subtitle={"all order details and Status"} />
      <div>
        <table className='w-full' style={{ color: `${colors.grey[100]}` }}>
          <thead style={{ backgroundColor: `${colors.blueAccent[400]}` }} className='border-b-2 border-gray-200'>
            <tr>
              <th className="p-3 font-semibold tracking-wide text-left">Orderr Id</th>
              <th className="p-3 font-semibold tracking-wide text-left">Customer Name</th>
              <th className="p-3 font-semibold tracking-wide text-left">Payment Method</th>
              <th className="p-3 font-semibold tracking-wide text-left">Amount</th>
              <th className="p-3 font-semibold tracking-wide text-left">Payment Status</th>
              <th className="p-3 font-semibold tracking-wide text-left">Order Status</th>
            </tr>
          </thead>
          <tbody>
            {order &&
              order.slice(0, 5).map((item) => (
                <tr key={item._id} style={{ backgroundColor: `${colors.primary[400]}` }} className='border-b-2'>
                  <td className="p-3 text-sm">{item._id}</td>
                  <td className="p-3 text-sm">{item.shippingAddess.name}</td>
                  <td className="p-3 text-sm">{item.paymentDetails.paymentMethod}</td>
                  <td className="p-3 text-sm">₹ {item.totalDiscountPrice}</td>
                  <td className={`p-3 text-sm ${item.paymentDetails.PaymentStatus == "PENDING" ? "text-pink-700" : 'text-yellow-700'}`}>{item.paymentDetails.PaymentStatus}</td>
                  <td className="p-3 text-sm" style={getMenuItemStyles(item.orderStatus)}>{item.orderStatus}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <Link to='/admin/order'>
          <p className='text-right p-2 underline'>view more....</p>
        </Link>

      </div>
    </>
  )
}

export default Order4Dashboard