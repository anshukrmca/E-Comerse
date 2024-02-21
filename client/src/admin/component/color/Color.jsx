import React, { useEffect, useState } from 'react'
import AddColor from '../InputForm/AddColor'
import HeaderTittle from '../../../Customer/components/HeaderTittle'
import axios from 'axios'
import { Box, IconButton, Tooltip, useTheme } from '@mui/material'
import { tokens } from '../../../theme'
import DataLoading from '../../../Customer/components/Loding/DataLoading'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { toast } from 'react-toastify'

const Color = () => {
  const [color, setColor] = useState(null)
  const [newColor, setNewColor] = useState(false)
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [ColorId,setColorId] = useState('')

  const fetchColor = async () => {
    const response = await axios.get('/api/color');
    setColor(response.data)
  }

  useEffect(() => {
    fetchColor();
  }, [])

  const closeForm = () => {
    setNewColor(false);
    setColorId('');
  }

  const handledeleteColor = async (id) => {
    const response = await axios.delete(`/api/color/${id}`);
    toast.success(response.data.message);
    await fetchColor();
  }

  
  const handleEditColor = async (id) => {
    setColorId(id);
    setNewColor(true);
  }




  const columns = [
    {
      field: 'colorName', headerName: 'Color Name', headerAlign: "center", align: "center", flex: 1,
      renderCell: (params) => (
        <p className='p-2 w-full text-center rounded-lg' style={{ backgroundColor: params.row.colorCode }}>{params.row.colorName}</p>
      ),
    },
    { field: 'colorCode', headerName: 'Color Code', headerAlign: "center", align: "center", flex: 1, valueGetter: (params) => params.row.colorCode },
    {
      field: '_id', headerName: 'Action', headerAlign: "center", align: "center", flex: 1,
      renderCell: (params) => (
        <div >
          <Tooltip title='Edit'>
            <IconButton onClick={()=>{handleEditColor(params.row._id)}}>
              <FaRegEdit className='text-yellow-700' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Delete'>
            <IconButton onClick={() => { handledeleteColor(params.row._id) }}>
              <FaTrashAlt className='text-red-600 text-sm' />
            </IconButton>
          </Tooltip>


        </div>
      ),
    },



  ];

  return (
    <>
      <HeaderTittle tittle={"Color"} subtitle={"all color Name and Code"} />
      <div style={{ backgroundColor: `${colors.primary[400]}` }} onClick={(e) => { setNewColor(!newColor) }} className="font-semibold cursor-pointer p-2 mb-4  uppercase">
        <span className='px-3'>&#128073;</span>Add New Category
      </div>
      {newColor && <AddColor closeForm={closeForm} id={ColorId}/>}
      <Box
        height="80dvh"
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
        {color && color.length >= 0 ? <DataGrid
          rows={color}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row._id}
        /> : <DataLoading />}
      </Box>
    </>
  )
}

export default Color