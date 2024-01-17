import React from 'react'
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { FaBlenderPhone } from "react-icons/fa6";
import { MdOutlinePlace } from "react-icons/md";
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <>
      <footer className='p-8 grid gap-x-16 gap-y-4 md:grid-cols-3'>
        <div>
          <h1 className='font-bold text-3xl uppercase mb-4 tracking-wider'>
            <Link to='/'>E-Comerse__:)</Link>
          </h1>
          <p className='text-justify text-sm'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione
            recusandae nobis sunt aliquid tempore vitae sapiente ea voluptatibus
            ab repellat asperiores eius cum laboriosam facilis eos, maiores
            deleniti nemo consequuntur assumenda sed consectetur culpa voluptatum
            quisquam quibusdam? Saepe, soluta quibusdam.
          </p>
        </div>
        <div>
          <h2 className='font-bold text-2xl mb-4 tracking-wider'>Useful Links</h2>
          <div className='grid gap-1 md:grid-cols-2 mb-2'>
                <Link className='hover:underline hover:text-lime-500'>Home</Link>
                <Link className='hover:underline hover:text-lime-500'>Man Fashion</Link>
                <Link className='hover:underline hover:text-lime-500'>Accessories</Link>
                <Link className='hover:underline hover:text-lime-500'>Order Tracking</Link>
                <Link className='hover:underline hover:text-lime-500'>Cart</Link>
                <Link className='hover:underline hover:text-lime-500'>My Account</Link>
                <Link className='hover:underline hover:text-lime-500'>Wishlist</Link>
                <Link className='hover:underline hover:text-lime-500'>Terms</Link>
          </div>
        </div>
        <div>
          <h2 className='font-bold text-2xl mb-4 tracking-wider'>Contact</h2>
          <ul className='text-center'>
            <li className="flex items-center">
              <MdOutlinePlace className="mr-4" />
              <span>: Patna , Bihar</span>
            </li>
            <li className='flex items-center'>
              <FaBlenderPhone className='mr-4' />
              <span>: +91 7654264729</span>
            </li>
            <li className='flex items-center'>
              <MdOutlineMarkEmailUnread className='mr-4' />
              <span>: anshukumarmca@gmail.com</span>
            </li>
          </ul>
        </div>
      </footer>

    </>
  )
}

export default Footer