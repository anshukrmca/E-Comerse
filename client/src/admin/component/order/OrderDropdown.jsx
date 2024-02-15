import React, { useEffect, useState } from 'react'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';
import { FaTrashAlt } from "react-icons/fa";
import { IconButton, Tooltip } from '@mui/material';
import {toast} from 'react-toastify'


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

    const handleOrderDelete= async()=>{
        if (orderId) {
            const response = await axios.delete(`/api/admin/orders/${orderId}`, {
                orderId: orderId
            });
            toast.success(response.data.message);
        }
    }

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
        <div className='flex items-center gap-2 w-48'>
        <Select value={OrderStatus} onChange={handleOrderStatusChange} className='w-32 font-semibold' style={getMenuItemStyles(OrderStatus)}>
                <MenuItem value="PLACED" style={getMenuItemStyles('PLACED')}>PLACED</MenuItem>
                <MenuItem value="CONFIRMED" style={getMenuItemStyles('CONFIRMED')}>CONFIRMED</MenuItem>
                <MenuItem value="SHIPPED" style={getMenuItemStyles('SHIPPED')}>SHIPPED</MenuItem>
                <MenuItem value="DELIVERED" style={getMenuItemStyles('DELIVERED')}>DELIVERED</MenuItem>
                <MenuItem value="CANCELLED" style={getMenuItemStyles('CANCELLED')}>CANCELLED</MenuItem>
            </Select>
            <div>
                <Tooltip title='Delete'>
                    <IconButton onClick={handleOrderDelete}>
                    <FaTrashAlt className='text-red-600 text-sm'/>
                    </IconButton>
                </Tooltip>
            </div>
        </div>
            
            
        </>
    )
}

export default OrderDropdown