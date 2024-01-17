import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout'

const Signup = () => {
    const [userDate, setUserDate] = useState({})

    const handleChange = (e) => {
        setUserDate({ ...userDate, [e.target.id]: e.target.value });
    };

    const formSubmitHandler = (e) => {
        e.preventDefault();
        if(userDate.password == userDate.cpassword){
            console.log(userDate);
        }
        else{
            console.log("password is not match" , userDate);
        }
    };

    return (
        <>
            <Layout>

                <div className="p-6 w-full md:w-4/5 lg:w-4/5 xl:w-4/5 mx-auto">
                    <div className="z-10 w-full p-10 h-100 bg-gray-100 dark:bg-gray-900">
                        <div className='flex items-center  justify-center gap-2'>
                            <h2 className="text-xl underline text-center font-bold leading-tight mb-7 md:text-3xl">
                                Sign Up
                            </h2>
                            <p className='text-xl dark:text-green-600 text-lime-400 cursor-pointer animate-bounce hover:text-lime-500'>
                                E-Comerse__:)
                            </p>
                        </div>
                        <form
                            onSubmit={formSubmitHandler}
                            className="mt-6">
                            <div className='grid gap-4 mb-4 md:grid-cols-2 text-black'>
                                <input
                                    id='name'
                                    onChange={handleChange}
                                    className='block p-2 border-2 rounded focus:outline-none'
                                    type='text'
                                    placeholder='First Name'
                                />
                                <input
                                    id='email'
                                    onChange={handleChange}
                                    className='block p-2 border-2 rounded focus:outline-none'
                                    type='text'
                                    placeholder='Email'
                                />
                                <input
                                    id='password'
                                    onChange={handleChange}
                                    className='block p-2 border-2 rounded focus:outline-none'
                                    type='password'
                                    placeholder='Password'
                                />
                                <input
                                    id='cpassword'
                                    onChange={handleChange}
                                    className='block p-2 border-2 rounded focus:outline-none'
                                    type='password'
                                    placeholder='Confirm Password'
                                />
                            </div>
                            <button
                                className="w-full px-4 py-3 mt-6 font-semibold text-gray-200 bg-blue-600 rounded-lg hover:text-gray-700 hover:bg-blue-200 "
                                type="submit">LOGIN</button>
                            <p className="mt-6 text-gray-700 dark:text-gray-300">Have an account ?
                                <Link to='/login' className='capitalize underline mb-4 font-semibold text-blue-500 hover:text-blue-700'> Sign In</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </Layout>
        </>

    );
};

export default Signup;
