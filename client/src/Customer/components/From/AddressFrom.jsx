import React from 'react'
import TextField from '@mui/material/TextField';
import { Button, Grid, } from '@mui/material';



const address = [
    {
        id: 'name',
        lable: "Name"
    },
    {
        id: 'mobile',
        lable: "Mobile"
    },
    {
        id: 'ziocode',
        lable: "Zip Code"
    },
    {
        id: 'city',
        lable: "City"
    },
    {
        id: 'state',
        lable: "State"
    },
    {
        id: 'lankmark',
        lable: "Landmark (Optional)"
    },

]



const AddressFrom = ({ closeForm }) => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const userData = {
            name: data.get("name"),
            mobile: data.get("mobile"),
            ziocode: data.get("ziocode"),
            city: data.get("city"),
            state: data.get("state"),
            streetAddress: data.get("streetAddress"),
        };
        try {
            console.log(userData);
        } catch (error) {
            console.error(error);
            // Handle other errors or network issues
        }
    };

    return (
        <>
            <div className='dark:bg-slate-400 bg-[#f0f5ff] p-4'>
                <p className='text-indigo-700  font-semibold mb-4'>ADD A NEW ADDRESS</p>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={1}>
                        {address.map((item, i) => {
                            return (
                                <Grid key={i} item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id={item.id}
                                        name={item.id}
                                        label={item.lable}
                                        fullWidth
                                        variant="standard"
                                        autoComplete='off'
                                        sx={{ outlineColor: 'black', borderColor: 'black', color: 'whitesmoke' }}
                                    />
                                </Grid>

                            )
                        })}
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="streetAddress"
                                name="streetAddress"
                                label="Full Address & Street Name"
                                fullWidth
                                variant="standard"
                                autoComplete='off'
                                sx={{ outlineColor: 'black', borderColor: 'black', color: 'whitesmoke' }}
                            />
                        </Grid>


                        <Grid item xs={12} sm={6}>
                            <Button
                                className="w-full"
                                type="submit"
                                variant="contained"
                                sx={{
                                    mt:1,
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
                </form>
            </div>
        </>
    )
}

export default AddressFrom