import React from 'react'

const HeaderTittle = ({tittle}) => {
    return (
        <>
            <div className='mb-3 p-2'>
                <h1 className='text-3xl cursor-pointer underline font-bold md:text-3xl lg:text-4xl hover:text-lime-700'>
                    {tittle}
                </h1>
            </div>
        </>
    )
}

export default HeaderTittle