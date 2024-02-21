import { Button, Grid, TextField, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { tokens } from '../../../theme';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddColor = ({ closeForm, id }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedColor, setSelectedColor] = useState({
    colorName: '',
    colorCode: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedColor((prevselectedColor) => ({
      ...prevselectedColor,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (id) {
      const response = await axios.put(`/api/color/${id}`, selectedColor);
      const data = response.data;
      closeForm();
      toast.success(data.message)
    } else {
      const response = await axios.post('/api/color/new-color', selectedColor);
      const data = response.data;
      closeForm();
      toast.success(data.message)
    }
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  // for edit 
  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get(`/api/color/${id}`);
      setSelectedColor(response.data);
    }
    if (id) {
      fetchdata();
    }
  }, [id])

  return (
    <>
      <div className='p-3 mt-4 mb-4 rounded-sm' style={{ background: `${colors.primary[400]}`, color: `${colors.grey[200]}` }}>
        <p className='mb-2 font-semibold'>New Color</p>
        {/* <form onSubmit={handleSubmit}> */}

        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="colorName"
              name="colorName"
              label="Color Name"
              fullWidth
              placeholder="like ( white,red,black )"
              variant="standard"
              autoComplete='off'
              sx={{ outlineColor: 'black', fontSize: "10px", borderColor: 'black', color: 'whitesmoke' }}
              value={selectedColor.colorName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="colorCode"
              name="colorCode"
              label="Color Code (hexadecimal code )"
              placeholder="like (#808080 )"
              fullWidth
              variant="standard"
              autoComplete='off'
              sx={{ outlineColor: 'black', borderColor: 'black', color: 'whitesmoke' }}
              value={selectedColor.colorCode}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              onClick={handleSubmit}
              className="w-full"
              type="submit"
              variant="contained"
              sx={{
                mt: 1,
                padding: ".4rem 0",
                bgcolor: "#9155FD",
                "&:hover": {
                  bgcolor: "#9175FD",
                },
              }}
            >
             {!id ? 'Save' : 'Update'}
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              onClick={() => { closeForm() }}
              className="w-full"
              variant="contained"
              sx={{
                mt: 1,
                padding: ".4rem 0",
                bgcolor: "#9155FD",
                "&:hover": {
                  bgcolor: "#9175FD",
                },
              }}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
        {/* </form> */}

      </div>
    </>
  )
}

export default AddColor