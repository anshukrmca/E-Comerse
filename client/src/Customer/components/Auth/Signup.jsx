import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, TextField } from '@mui/material';
import axios from 'axios'
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
    const navigate = useNavigate()

    const handleSubmitData = async (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget);
        const userData = {
            name: data.get("name"),
            email: data.get("email"),
            password: data.get("password"),
            cpassword: data.get("cpassword"),
        }
        if (userData.password == userData.cpassword) {
            try {
                const response = await axios.post('/api/auth/signup', userData);
                const data = response.data;
                console.log(data);
                navigate('/login');
            } catch (error) {
                console.log(error.response.data.message);
            }
        } else {
            console.log("Password miss match", userData)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmitData}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <p className='text-center text-3xl font-bold underline animate-bounce dark:text-indigo-600 text-indigo-900 hover:text-lime-500'>Sign Up</p>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="name"
                            name='name'
                            label="Name"
                            fullWidth
                            variant="standard"
                            autoComplete="off"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="email"
                            name='email'
                            label="Email"
                            fullWidth
                            type='email'
                            autoComplete='given email'
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="password"
                            name='password'
                            label="Password"
                            fullWidth
                            type='password'
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="cpassword"
                            name='cpassword'
                            label="Confirm password"
                            fullWidth
                            type='password'
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            className='w-full'
                            type='submit'
                            variant='contained'
                            sx={{
                                mt: 3,
                                padding: ".5rem 0", bgcolor: '#9155FD',
                                '&:hover': {
                                    bgcolor: "#9175FD",
                                }
                            }}>Register</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            className='w-full'
                            variant='contained'
                            sx={{
                                padding: ".3rem 0", bgcolor: '#ff3333',
                                '&:hover': {
                                    bgcolor: "#ff1a1a",
                                }
                            }}>Sign In with <FcGoogle className='mx-2' size={25} /></Button>
                    </Grid>
                </Grid>
            </form>
            <div className='mt-4'>
                <p className='font-thin text-sm'>have a Account ? <span onClick={() => { navigate("/login") }} className='text-indigo-600 font-bold cursor-pointer'>Login</span></p>
            </div>
        </>

    );
};

export default Signup;
