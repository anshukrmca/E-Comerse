import React, { useRef } from 'react';

import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout'

const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    console.log(username, password);
    // if (!password.trim() || !username.trim()) return;
    // dispatch(
    //   login({
    //     username,
    //     password,
    //   })
    // );
    usernameRef.current.value = '';
    passwordRef.current.value = '';
  };
  return (
    <>
      <Layout>
        <div className='p-4 mb-4'>
          <div className="max-w-6xl px-0 mx-auto lg:px-6">
            <div className="flex flex-col items-center h-full md:flex-row">
              <div
                className="flex items-center justify-center h-screen max-w-full px-0 md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 lg:px-16 xl:px-12">
                <div className="z-10 w-full p-10 bg-gray-100 dark:bg-gray-900 h-100">
                  <h2 className="text-xl underline text-center font-bold leading-tight mb-7 md:text-3xl dark:text-gray-300">
                    Sign In</h2>
                  <form
                    onSubmit={formSubmitHandler}
                    className="">
                    <div>
                      <label className="block ">Email:</label>
                      <input type="email"
                        ref={usernameRef}
                        className="w-full px-4 py-3 mt-2  rounded-lg   dark:border dark:border-gray-800"
                        placeholder="Enter your email" />
                    </div>
                    <div className="mt-5">
                      <div>
                        <label className=" ">Password:</label>
                        <div className="relative flex items-center mt-2">
                          <input type="password"
                            ref={passwordRef}
                            className="w-full px-4 py-3  rounded-lg  dark:border dark:border-gray-800 "
                             placeholder="Enter password" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 text-right">
                      <a href="#" className="text-sm font-semibold text-blue-700 hover:underline">forgot
                        password?</a>
                    </div>
                    <button
                      className="w-full px-4 py-3 mt-6 font-semibold text-gray-200 bg-blue-600 rounded-lg hover:text-gray-700 hover:bg-blue-200 "
                      type="submit">LOGIN</button>
                    <p className="mt-6 text-gray-700 dark:text-gray-300"> Need an account?
                    <Link to='/signup' className='capitalize underline mb-4 font-semibold text-blue-500 hover:text-blue-700'>Create an account</Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Login;
