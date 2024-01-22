import React from 'react'

const HeaderTittle = ({tittle}) => {
    return (
        <>
            <div className='mb-3 p-2'>
                <p className='md:text-2xl cursor-pointer underline font-bold hover:text-lime-700'>
                    {tittle}
                </p>
            </div>
        </>
    )
}

export default HeaderTittle