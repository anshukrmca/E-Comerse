import React, { useState } from 'react';

import { LuSendHorizonal } from "react-icons/lu";


const Newsletter = () => {
  const [input, setInput] = useState()
  return (
    <section className='bg-gray-600 dark:bg-gray-800 py-12 px-8 flex flex-col items-center'>
      <h2 className='font-bold text-5xl sm:text-6xl md:text-7xl mb-10'>
        Newsletter
      </h2>
      <p className='text-2xl mb-10 text-center'>
        Get timely updates from your favorite products
      </p>
      <form
        action=''
        className='border rounded-lg overflow-hidden flex flex-nowrap'
      >
        <input
          value={input}
          onChange={(e) => { setInput(e.target.value) }}
          type='text'
          placeholder='Your email'
          className='px-6 py-2 focus:outline-none text-black'
        />
        <button className='bg-teal-600 px-6 py-2 text-white'>
          <LuSendHorizonal />
        </button>
      </form>
    </section>
  );
};

export default Newsletter;
