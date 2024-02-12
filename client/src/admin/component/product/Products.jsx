import React, { useEffect, useState } from 'react'
import NewProduct from './NewProduct'
import HeaderTittle from '../../../Customer/components/HeaderTittle';
import { mockDataContacts } from './data';
import { Avatar, Box, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from '../../../theme';
import BtnAction from './BtnAction';
import axios from 'axios';


const Products = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const closeForm = () => {
    setIsFormOpen(false)
  }

  const columns = [
    { field: "avatar", headerName: "Avatar", width: 100, headerAlign: "center", align: "center", renderCell: (params) => <Avatar alt="Avatar" src={params.value} /> },
    { field: "id", headerName: "ID", headerAlign: "center", flex: 0.5, align: "center" },
    { field: "registrarId", headerName: "Registrar ID", headerAlign: "center", align: "center" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
      headerAlign: "center",
      align: "center"
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "center",
      align: "center"
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
      headerAlign: "center",
      align: "center"
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      headerAlign: "center",
      align: "center"
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
      headerAlign: "center",
      align: "center"
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
      headerAlign: "center",
      align: "center"
    },
    {
      field: "zipCode",
      headerName: "Zip Code",
      flex: 1,
      headerAlign: "center",
      align: "center"
    },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      align: "center",
      width: 150,
      renderCell: (params) => (
        <BtnAction idd={params.row.id} closeForm={closeForm} setIsFormOpen={setIsFormOpen} />
      )
    }
  ];

useEffect(()=>{
 const fetchdata = async()=>{
 const response = await axios.get('/api/product');
 console.log(response.data);
 };

 fetchdata();
},[])


  return (
    <div>


      <div className=' mb-4 p-2'>
        <HeaderTittle tittle={"Product"} subtitle={"List of Product"} />
        <div className='mb-4'>
          <div style={{ backgroundColor: `${colors.primary[400]}` }} onClick={() => { setIsFormOpen(!isFormOpen) }}
            className='font-bold cursor-pointer shadow-md p-3'> + Add New Product</div>
          <div className='mt-2'>
            {isFormOpen && <NewProduct closeForm={closeForm} />}
          </div>
        </div>
        <Box
          height="90vh"
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
          <DataGrid
            rows={mockDataContacts}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>

      </div>
    </div>
  )
}

export default Products