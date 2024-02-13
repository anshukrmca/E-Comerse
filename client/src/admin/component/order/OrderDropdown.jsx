import React, { useEffect, useState } from 'react'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import './style.css'
import axios from 'axios';

const OrderDropdown = ({ Status, orderId }) => {
    const [OrderStatus, setOrderStatus] = useState('')

    useEffect(() => {
        if (Status) {
            setOrderStatus(Status);
        }
    }, [Status]);


    const handleOrderStatusChange = async (event) => {
        const newValue = event.target.value;
        if (orderId) {
            const response = await axios.put('/api/admin/orders', {
                orderstatus: newValue,
                orderId: orderId
            });
            console.log(response.data);
        }
    };


    const getMenuItemStyles = (status) => {
        switch (status) {
            case 'PLACED':
                return { color: 'pink' };
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
            <Select value={OrderStatus} onChange={handleOrderStatusChange} className='w-32 font-semibold' style={getMenuItemStyles(OrderStatus)}>
                <MenuItem value="PLACED" style={getMenuItemStyles('PLACED')}>PLACED</MenuItem>
                <MenuItem value="CONFIRMED" style={getMenuItemStyles('CONFIRMED')}>CONFIRMED</MenuItem>
                <MenuItem value="SHIPPED" style={getMenuItemStyles('SHIPPED')}>SHIPPED</MenuItem>
                <MenuItem value="DELIVERED" style={getMenuItemStyles('DELIVERED')}>DELIVERED</MenuItem>
                <MenuItem value="CANCELLED" style={getMenuItemStyles('CANCELLED')}>CANCELLED</MenuItem>
            </Select>
            {/* <p>{orderId}</p> */}
        </>
    )
}

export default OrderDropdown