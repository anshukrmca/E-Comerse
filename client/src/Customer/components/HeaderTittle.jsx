import React from 'react'
import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from '../../theme';

const HeaderTittle = ({ tittle, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      <Box mb="30px">
        <Typography
          variant="h4"
          color={colors.grey[100]}
          fontWeight="bold"
          sx={{ m: "0 0 5px 0" }}
          className='uppercase'
        >
          {tittle}
        </Typography>
        <Typography color={colors.greenAccent[400]}>
          {subtitle}
        </Typography>
      </Box>
    </>
  )
}

export default HeaderTittle;