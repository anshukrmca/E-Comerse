import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Customer/pages/Home/Home'
import About from './Customer/pages/About/About'
import Login from './Customer/pages/Auth/Login'
import Signup from './Customer/pages/Auth/Signup'
import SingleProduct from './Customer/components/product/SingleProduct'
import AllProducts from './Customer/components/product/AllProducts'
import Cart from './Customer/components/cart/Cart'
import ProductStore from './Customer/components/product/ProductStore'

const App = () => {
  return (
    <div className='dark:bg-black text-black dark:text-white bg-slate-200 h-full w-[160dvw] md:w-full'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/about' element={<About />} />
        <Route path='/products/:id' element={<SingleProduct />} />
        <Route path='/category/:name' element={< ProductStore/>} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/store' element={<ProductStore />} />
      </Routes>

    </div>
  )
}

export default App