import React, { useEffect, useState } from 'react'
import NewProduct from './NewProduct'
import HeaderTittle from '../../../Customer/components/HeaderTittle';
import { mockDataContacts } from './data';
import { Avatar, Box, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from '../../../theme';
import BtnAction from './BtnAction';
import axios from 'axios';
import {Link} from 'react-router-dom'


const Products = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [Products, setProducts] = useState('')

  const closeForm = () => {
    setIsFormOpen(false)
  }

  const columns = [
    { field: "mainImage", headerName: "Image", width: 100, headerAlign: "center", align: "center",flex: 1, renderCell: (params) => <Link to={`/products/${params.row._id}`}><Avatar alt="Avatar" src={params.value} /></Link> },
    { field: "title", headerName: "Title",headerAlign: "center", align: "center",flex: 1,},
    { field: "brand", headerName: "Brand",headerAlign: "center", align: "center",flex: 1, },
    { field: 'categoryName', headerName: 'Category', headerAlign: "center",align: "center",flex: 1, valueGetter: (params) => params.row.category.name },
    { field: "price", headerName: "Price",headerAlign: "center", align: "center" },
    { field: "discountedPercentage", headerName: "Discounted Percentage",headerAlign: "center", align: "center",flex: 1, },
    { field: "discountedPrice", headerName: "Discounted Price",headerAlign: "center", align: "center",flex: 1, },
    { field: "quantity", headerName: "Quantity",headerAlign: "center", align: "center",flex: 1, },
    { field: "action",headerName: "Action",headerAlign: "center",align: "center", width: 150, flex: 1,renderCell: (params) => (
        <BtnAction idd={params.row._id} closeForm={closeForm} setIsFormOpen={setIsFormOpen} />
      )
    }
  ];

  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get('/api/product');
      setProducts(response.data);
    };

    fetchdata();
  }, [])


  return (
    <div>


      <div className='mb-4 p-2'>
        <HeaderTittle tittle={"Product"} subtitle={"List of Product"} />
        <div className='mb-6'>
          <div style={{ backgroundColor: `${colors.primary[400]}` }} onClick={() => { setIsFormOpen(!isFormOpen) }}
            className='font-bold cursor-pointer shadow-md p-3'> + Add New Product</div>
          <div className='mt-2'>
            {isFormOpen && <NewProduct closeForm={closeForm} />}
          </div>
        </div>
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
          {Products && <DataGrid
            rows={Products}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            getRowId={(row) => row._id}
          />}
        </Box>

      </div>
    </div>
  )
}

export default Products