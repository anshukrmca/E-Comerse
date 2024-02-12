import React from 'react'
import Footer from '../Footer/Footer'
import Nav from '../Navbar/Nav'
import { ToastContainer } from 'react-toastify';

const Layout = ({ children }) => {
  return (
    <>
      <div className='flex flex-col min-h-full'>
      <ToastContainer />
        {/* <Navbar /> */}
        <Nav/>
        <div className='flex-1 mt-32 z-10'>
          {children}
        </div>
        <div className='bottom-0 mx-4'>
          <hr/>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Layout