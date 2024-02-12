import { useTheme } from '@emotion/react';
import { IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import { tokens } from '../../../theme';

const BtnAction = ({ idd, setIsFormOpen }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleEdit = async (id) => {
        setIsFormOpen(true);
        alert(id);
    }
    return (
        <>
            <div className=''>
                <Tooltip title="View Product">
                    <IconButton onClick={() => { alert(idd) }}>
                        <FaEye size={17} style={{ color: `${colors.blueAccent[400]}` }} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Edit Product">
                    <IconButton onClick={() => { handleEdit(idd) }}>
                        <FaEdit size={17} className='text-yellow-600' />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete Product">
                    <IconButton onClick={() => { alert(idd) }}>
                        <FaTrash size={17} style={{ color: `${colors.redAccent[500]}` }} />
                    </IconButton>
                </Tooltip>
            </div>
        </>
    )
}

export default BtnAction