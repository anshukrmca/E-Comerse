
import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { IoIosMail } from 'react-icons/io'
import { FaHandshake } from 'react-icons/fa'
import { useTheme } from '@mui/material'
import { tokens } from '../../../theme'

export default function UserInfoModel({ open, setOpen, user }) {
    const cancelButtonRef = useRef(null)
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-[99]" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="">
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                User Information
                                            </Dialog.Title>
                                            <div className="">
                                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none h-48">
                                                    <img
                                                        src={open && user.profilePicture}
                                                        alt="Front of men's Basic Tee in black."
                                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                                    />
                                                </div>
                                                <div className="mt-4">
                                                    <div className='flex justify-between'>
                                                        <h3 className="text-sm font-semibold">{open && user.name}</h3>
                                                        <p className={`mt-1 text-sm font-light rounded-lg px-2 cursor-pointer ${open &&  user.isAdmin === "true" ? 'text-red-700 bg-red-200' : 'text-green-800 bg-green-200'}`}>
                                                            {open &&  user.isAdmin === "true" ? "Admin" : "Customer"}
                                                        </p>

                                                    </div>
                                                    <p className="mt-1 text-sm flex items-center gap-2"><IoIosMail size={20} /> {open && user.email}</p>
                                                    <p className="mt-1 text-sm flex items-center gap-2"><FaHandshake size={20} /> {new Date(open &&  user.createdAt).toLocaleString()}</p>
                                                </div>
                                                <div className=''>
                                                    {open && user.Useraddress.map((data, i) => {
                                                        return (
                                                            <div key={i}>
                                                                <div className='mt-4 justify-between items-center p-4 mb-2' style={{ backgroundColor: `${colors.primary[400]}` }}>
                                                                    <div className='flex gap-4 font-semibold'>
                                                                        <p>{data.name}</p>
                                                                        <p>{data.mobile}</p>
                                                                    </div>
                                                                    <p>
                                                                        {data.streetAddress} , {data.city} , {data.state} , {data.zipCode}
                                                                    </p>
                                                                    <p><span className='font-bold'>Land Mark :</span> {data.landmarks}</p>
                                                                </div>

                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root >
    )
}
