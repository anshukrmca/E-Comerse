import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../../theme';
import { Box, useTheme } from '@mui/material';
import OrderDropdown from './OrderDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminOrder, selectorders } from '../../../redux/features/adminOrderSlice';
import DataLoading from '../../../Customer/components/Loding/DataLoading';




const Order = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [order, setOrder] = useState("")
    const dispatch = useDispatch();
    const adminOrderss = useSelector(selectorders);
    const token = localStorage.getItem("token");


    const columns = [
        { field: 'CustomerName', headerName: 'Customer Name', headerAlign: "center", align: "center", flex: 1, valueGetter: (params) => params.row.shippingAddess.name },
        { field: 'paymentMethod', headerName: 'Payment Method', headerAlign: "center", align: "center", flex: 1, valueGetter: (params) => params.row.paymentDetails.paymentMethod },
        { field: 'totalDiscountPrice', headerName: 'Amount', headerAlign: "center", align: "center", flex: 1, valueGetter: (params) => "₹ " + params.row.totalDiscountPrice },
        { field: 'PaymentStatus', headerName: 'Payment Status', headerAlign: "center", align: "center", flex: 1, valueGetter: (params) => params.row.paymentDetails.PaymentStatus },
        {
            field: 'orderStatus',
            headerName: 'Order Status',
            headerAlign: "center", align: "center",
            width: 200,
            renderCell: (params) => (
                <OrderDropdown Status={params.row.orderStatus} orderId={params.row._id}/>
            ),
        },
    ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          dispatch(getAdminOrder());
          setOrder(adminOrderss);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Invoke the async function
  }, [token, dispatch, adminOrderss]); // Include token, dispatch, and adminOrderss in the dependency array


    return (
        <Box
            height="auto"
            maxHeight="90dvh"
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
            {order && order.length >= 0 ? <DataGrid
                rows={order}
                columns={columns}
                components={{ Toolbar: GridToolbar }}
                getRowId={(row) => row._id}
            /> : <DataLoading />}
        </Box>
    );
};

export default Order;
