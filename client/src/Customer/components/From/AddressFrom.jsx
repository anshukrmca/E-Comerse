import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button, Grid, } from '@mui/material';
import { toast } from 'react-toastify'
import axios from 'axios'



const address = [
    {
        id: 'name',
        lable: "Name",
        colSize: 12,
        smColSize: 6
    },
    {
        id: 'mobile',
        lable: "Mobile",
        colSize: 12,
        smColSize: 6
    },

    {
        id: 'city',
        lable: "City",
        colSize: 12,
        smColSize: 6
    },
    {
        id: 'state',
        lable: "State",
        colSize: 12,
        smColSize: 6
    },
    {
        id: 'landmarks',
        lable: "Landmark (Optional)",
        colSize: 12,
        smColSize: 6
    },
    {
        id: 'zipCode',
        lable: "Zip Code",
        colSize: 12,
        smColSize: 6
    },
    {
        id: 'streetAddress',
        lable: "Full Address",
        colSize: 12,
        smColSize: 12
    },

]



const AddressFrom = ({ closeForm, AddressId }) => {

    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        zipCode: '',
        city: '',
        state: '',
        landmarks: '',
        streetAddress: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            if (AddressId) {
                try {
                    const res = await axios.get(`/api/address/AddressbyId/${AddressId}`);
                    const data = res.data.address;
                    setFormData((prevData) => ({
                        ...prevData,
                        name: data.name,
                        mobile: data.mobile,
                        zipCode: data.zipCode,
                        city: data.city,
                        state: data.state,
                        landmarks: data.landmarks,
                        streetAddress: data.streetAddress
                    }));
                } catch (error) {
                    console.error('Error fetching address data:', error);
                }
            }
        };

        fetchData();
    }, [AddressId])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const userData = {
            name: data.get("name"),
            mobile: data.get("mobile"),
            zipCode: data.get("zipCode"),
            city: data.get("city"),
            state: data.get("state"),
            streetAddress: data.get("streetAddress"),
            landmarks: data.get("landmarks"),
        };
        try {
            if (AddressId) {
                alert(AddressId)
                const response = await axios.put(`/api/address/update/${AddressId}`, userData);
                const data = response.data;
                console.log(data);
                toast.success(data.message)
            } else {
                const response = await axios.post('/api/address/newAddesss', userData);
                const data = response.data;
                toast.success(data.message)
            }
            
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error(error);
            // Handle other errors or network issues
        }
    };

    return (
        <>
            <div className='dark:bg-slate-400 bg-[#f0f5ff] p-4'>
                <p className='text-indigo-700  font-semibold mb-4'>{AddressId ? "Update" : "ADD A NEW"} ADDRESS</p>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={1}>
                        {address.map((item, i) => {
                            return (
                                <Grid key={i} item xs={item.colSize} sm={item.smColSize}>
                                    <TextField
                                        required
                                        id={item.id}
                                        name={item.id}
                                        label={item.lable}
                                        fullWidth
                                        variant="standard"
                                        autoComplete='off'
                                        sx={{ outlineColor: 'black', borderColor: 'black', color: 'whitesmoke' }}
                                        value={formData[item.id]}
                                        onChange={(e) => setFormData({ ...formData, [item.id]: e.target.value })}
                                    />
                                </Grid>

                            )
                        })}

                        <Grid item xs={12} sm={6}>
                            <Button
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
                                {AddressId ? "Update" : "Save"}
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