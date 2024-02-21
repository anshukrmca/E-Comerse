import React, { useEffect, useState } from 'react'
import AddCategory from '../InputForm/AddCategory'
import axios from 'axios'
import HeaderTittle from '../../../Customer/components/HeaderTittle'
import { FaTrash } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { Box, IconButton, Tooltip, useTheme } from '@mui/material';
import { tokens } from '../../../theme';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const Category = () => {
  const [category, setCategory] = useState([])
  const [newCategory, setNewCategory] = useState(false)
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [EditData, setEditData] = useState(null)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/category/thirdLevelCategory");
        const data = response.data.getThirdLevelCategory;
        setCategory(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { field: "fstLevel", headerName: "First Level", headerAlign: "center", align: "center", flex: 1, valueGetter: (params) => params.row.parentCategory.parentCategory.name },
    { field: "SndLevel", headerName: " Second Level", headerAlign: "center", align: "center", flex: 1, valueGetter: (params) => params.row.parentCategory.name },
    { field: "thrdLevel", headerName: " Third Level", headerAlign: "center", align: "center", flex: 1, valueGetter: (params) => params.row.name },
    {
      field: "action", headerName: "Action", headerAlign: "center", align: "center", width: 150, flex: 1, renderCell: (params) => (
        <Tooltip title='Edit'>
          <IconButton onClick={() => { handleEdit(params.row._id, params.row.name, params.row.parentCategory._id, params.row.parentCategory.name) }}>
            <FaRegEdit size={20} className='text-yellow-500' />
          </IconButton>
        </Tooltip>
      )
    }
  ];

  const closeForm = () => {
    setNewCategory(false);
    setEditData(null);
  }

  const handleEdit = async (TopId, TopData, SecId, SecData) => {
    setEditData({ TopId: TopId, TopData: TopData, SecId: SecId, SecData: SecData });
    setNewCategory(true);
  }

  return (
    <>
      <div>
        <HeaderTittle tittle={"Category List"} subtitle={"Category List Fst & Snd Level"} />
        <div style={{ backgroundColor: `${colors.primary[400]}` }} onClick={(e) => { setNewCategory(!newCategory) }} className="font-semibold cursor-pointer p-2 mb-4  uppercase">
          <span className='px-3'>&#128073;</span>Add New Category
        </div>
        {newCategory && <AddCategory closeForm={closeForm} EditData={EditData} />}
        <Box
          height="75dvh"
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
          {category && <DataGrid
            rows={category}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            getRowId={(row) => row._id}
          />}
        </Box>

      </div>
    </>
  )
}

export default Category