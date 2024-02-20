import { useTheme } from '@emotion/react';
import { IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import { tokens } from '../../../theme';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BtnAction = ({ id, handleEdit }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    

    const handleDelete=async(id)=>{
        const response = await axios.delete(`/api/admin/product/${id}`);
        console.log(response.data);
    }
    return (
        <>
            <div className=''>
                <Tooltip title="View Product">
                    <IconButton onClick={() => { navigate(`/products/${id}`) }}>
                        <FaEye size={17} style={{ color: `${colors.blueAccent[400]}` }} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Edit Product">
                    <IconButton onClick={() => { handleEdit(id) }}>
                        <FaEdit size={17} className='text-yellow-600' />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete Product">
                    <IconButton onClick={() => handleDelete(id)}>
                        <FaTrash size={17} style={{ color: `${colors.redAccent[500]}` }} />
                    </IconButton>
                </Tooltip>
            </div>
        </>
    )
}

export default BtnAction