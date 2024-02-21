import { Button, Grid, TextField, useTheme } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { tokens } from '../../../theme'

const AddCategory = ({ closeForm, EditData }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [category, setCategory] = useState({});
  const [selectedCategory, setSelectedCategory] = useState({
    topLevelCategory: '',
    secondLevelCategory: '',
  });

  useEffect(() => {
    if (EditData) {
      setSelectedCategory({
        topLevelCategory: EditData.TopData,
        secondLevelCategory: EditData.SecData,
      })
    }
  }, [EditData])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedCategory((prevSelectedCategory) => ({
      ...prevSelectedCategory,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // Make the POST request
    if (EditData) {
      const Edata = { selectedCategory, TopId: EditData.TopId, SecId: EditData.SecId };
      const response = await axios.put('/api/category', Edata);
      const data = response.data;
      console.log(data)
      closeForm();
      toast.success(data.message)
    } else {
      const response = await axios.post('/api/category', selectedCategory);
      const data = response.data;
      closeForm();
      toast.success(data.message)
    }
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  // console.log(EditData);

  return (
    <div className='p-3 mt-4 rounded-sm' style={{ background: `${colors.primary[400]}`, color: `${colors.grey[200]}` }}>
      <p className='mb-2 font-semibold'>New Category</p>
      {/* <form onSubmit={handleSubmit}> */}

      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="topLevelCategory"
            name="topLevelCategory"
            label="Top Level Category"
            fullWidth
            placeholder="like ( Mens,Womens )"
            variant="standard"
            autoComplete='off'
            sx={{ outlineColor: 'black', fontSize: "10px", borderColor: 'black', color: 'whitesmoke' }}
            value={selectedCategory.topLevelCategory}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="secondLevelCategory"
            name="secondLevelCategory"
            label="Second Level Category"
            placeholder="like (Clothing,Accessories )"
            fullWidth
            variant="standard"
            autoComplete='off'
            sx={{ outlineColor: 'black', borderColor: 'black', color: 'whitesmoke' }}
            value={selectedCategory.secondLevelCategory}
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
            {EditData ? "update" : "Save"}
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
  )
}

export default AddCategory