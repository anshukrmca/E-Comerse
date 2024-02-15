import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { tokens } from '../../../theme';
import { Box, useTheme } from '@mui/material';
import axios from 'axios';
import OrderDropdown from './OrderDropdown';
import { useDispatch } from 'react-redux';
import { getAdminOrder } from '../../../redux/features/adminOrderSlice';

const columns = [
    { field: 'CustomerName', headerName: 'Customer Name',headerAlign: "center", align: "center", flex: 1, valueGetter: (params) => params.row.shippingAddess.name },
    { field: 'paymentMethod', headerName: 'Payment Method',headerAlign: "center", align: "center", flex: 1, valueGetter: (params) => params.row.paymentDetails.paymentMethod },
    { field: 'totalDiscountPrice', headerName: 'Amount',headerAlign: "center", align: "center", flex: 1, valueGetter: (params) => "₹ "+params.row.totalDiscountPrice },
    { field: 'PaymentStatus', headerName: 'Payment Status',headerAlign: "center", align: "center", flex: 1, valueGetter: (params) => params.row.paymentDetails.PaymentStatus },
    {
        field: 'orderStatus',
        headerName: 'Order Status',
        headerAlign: "center", align: "center",
        width:200,
        renderCell: (params) => (
            <OrderDropdown Status={params.row.orderStatus} orderId={params.row._id}/>
        ),
    },
];


const Order = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [order, setOrder] = useState("")
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAdminOrder());
    }, [])


    return (
        <Box
            height="90dvh"
            sx={{
                "& .MuiDataGrid-root": {
                    border: "none",
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                },
                "& .name-column--cell": {
                    color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.blueAccent[700],
                    borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.blueAccent[700],
                },
                "& .MuiCheckbox-root": {
                    color: `${colors.greenAccent[200]} !important`,
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `${colors.grey[100]} !important`,
                },
            }}
        >
            {order && <DataGrid
                rows={order}
                columns={columns}
                components={{ Toolbar: GridToolbar }}
                getRowId={(row) => row._id}
            />}
        </Box>
    );
};

export default Order;
