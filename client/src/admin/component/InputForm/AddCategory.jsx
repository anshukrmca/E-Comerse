import { Button, Grid, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const AddCategory = ({ closeForm }) => {
  const [category, setCategory] = useState({});
  const [selectedCategory, setSelectedCategory] = useState({
    topLevelCategory: '',
    secondLevelCategory: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedCategory((prevSelectedCategory) => ({
      ...prevSelectedCategory,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
      // Make the POST request
      const response = await axios.post('/api/category', selectedCategory);
      const data = response.data;
      closeForm();
      toast.success(data.message)
      setTimeout(() => {
        window.location.reload();
      }, 2000);
  };
  console.log(category)
  return (
    <div className='dark:bg-slate-400 bg-[#f0f5ff] p-3 mt-4 rounded-sm'>
      <p className='mb-2 font-semibold dark:text-gray-700'>New Category</p>
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
            Save
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