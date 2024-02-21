import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { Avatar, AvatarGroup, useTheme } from '@mui/material'
import { tokens } from '../../../theme'
import { IoIosMail } from 'react-icons/io'
import { FaHandshake } from 'react-icons/fa'
import CardItem from '../../../Customer/components/cart/CardItem'
import DataLoading from '../../../Customer/components/Loding/DataLoading'

const UserAllInformation = () => {
    const { id } = useParams()
    const [userData, setUserData] = useState(null);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [openSections, setOpenSections] = useState(new Set(['userinfo']));
    const [userCart, setuserCart] = useState([]);
    const [userOrder, setuserOrder] = useState([]);

    // get user information 
    useEffect(() => {
        const fetchdata = async () => {
            const response = await axios.get(`/api/user/${id}`);
            setUserData(response.data.user);
            setuserCart(response.data.usercart)
            setuserOrder(response.data.userorder)
        }
        if (id) {
            fetchdata();
        }
    }, [id])

    console.log(userOrder )

    const getMenuItemStyles = (status) => {
        switch (status) {
          case 'PLACED':
            return { backgroundColor: `${colors.redAccent[400]}` };
          case 'CONFIRMED':
            return { backgroundColor: 'cyan' };
          case 'SHIPPED':
            return { backgroundColor: 'purple' };
          case 'DELIVERED':
            return { backgroundColor: 'green' };
          case 'CANCELLED':
            return { backgroundColor: 'red' };
          default:
            return {};
        }
      };


    const toggleSection = (section) => {
        const newSections = new Set(openSections)

        if (newSections.has(section)) {
            // If section is already open, close it
            newSections.delete(section)
        } else {
            // If section is closed, open it
            newSections.add(section)
        }

        setOpenSections(newSections)
    }

    return (
        <>
            <div className='p-4' style={{ backgroundColor: `${colors.primary[400]}` }}>
                <div className={`mb-4 p-2 shadow-md rounded-md ${openSections.has('userinfo') ? 'border border-black shadow-xl' : ''}`}>
                    <div onClick={() => toggleSection('userinfo')} className='font-bold uppercase text-lg py-2 cursor-pointer'>
                        user personal informaton !  &#128102;
                    </div>
                    {openSections.has('userinfo') && (
                        <div>
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none h-60">
                                <img
                                    src={userData && userData.profilePicture}
                                    alt="Front of men's Basic Tee in black."
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4">
                                <div className='flex justify-between'>
                                    <h3 className="text-sm font-semibold">{userData && userData.name}</h3>
                                    <p className={`mt-1 text-sm font-light rounded-lg px-2 cursor-pointer ${userData && userData.isAdmin === "true" ? 'text-red-700 bg-red-200' : 'text-green-800 bg-green-200'}`}>
                                        {userData && userData.isAdmin === "true" ? "Admin" : "Customer"}
                                    </p>

                                </div>
                                <p className="mt-1 text-sm flex items-center gap-2"><IoIosMail size={20} /> {userData && userData.email}</p>
                                <p className="mt-1 text-sm flex items-center gap-2"><FaHandshake size={20} /> {new Date(userData && userData.createdAt).toLocaleString()}</p>
                            </div>
                            <div className='p-4'>
                                <p className='mt-2 font-bold underline'>Address Details</p>
                                {userData && userData.Useraddress.map((data, i) => {
                                    return (
                                        <div key={i}>
                                            <div className='justify-between items-center p-2 mb-2 shadow-md'>
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
                    )}
                </div>
                <div className={`mb-4 p-2 shadow-md rounded-md ${openSections.has('usercart') ? 'border border-black shadow-xl' : ''}`}>
                    <div onClick={() => toggleSection('usercart')} className='font-bold uppercase text-lg py-2 cursor-pointer'>
                        user cart information ! &#128722;
                    </div>
                    {openSections.has('usercart') && (
                        <div>
                            {userCart.cartItem.length > 0 ?
                                userCart.cartItem.map((item, i) => {
                                    return (
                                        <CardItem key={i} item={item} />
                                    )
                                })

                                : <DataLoading />}

                        </div>
                    )}
                </div>
                <div className={`mb-4 p-2 shadow-md rounded-md ${openSections.has('userorder') ? 'border border-black shadow-xl' : ''}`}>
                    <div onClick={() => toggleSection('userorder')} className='font-bold uppercase text-lg py-2 cursor-pointer'>
                        user order information ! &#128512;
                    </div>
                    {openSections.has('userorder') && (
                        <div>
                            {userOrder && userOrder.map((item, i) => {
                                return (
                                    <Link 
                                    // to={`/order-summery/${item._id}`} 
                                    key={i} className='flex cursor-pointer flex-col sm:flex-row justify-between items-center shadow-lg p-4 mb-4' style={{ backgroundColor: `${colors.primary[400]}` }}>
                                        <div className='mb-4 sm:mb-0 flex gap-4'>
                                            {item.orderItem && <AvatarGroup max={3}>
                                                {item && item.orderItem.map((PImg, i) => {
                                                    return (
                                                        <Avatar key={i} alt="Trevor Henderson" src={PImg?.product.mainImage} />
                                                    )
                                                })}

                                            </AvatarGroup>}

                                            <div className='mb-4 sm:mb-0'>
                                                <p className='text-sm sm:text-base'>{item.orderItem[0]?.product.title}</p>
                                            </div>
                                        </div>
                                        <div className='mb-4 sm:mb-0'>
                                            ₹{item.totalDiscountPrice}
                                        </div>

                                        <div>
                                            <div className='flex items-center mb-1'>
                                                <div className='w-3 h-3 rounded-full mx-1' style={getMenuItemStyles(item.orderStatus)} />
                                                {item.orderStatus}
                                            </div>
                                            <p className='font-thin text-xs sm:text-sm'>Your item has been delivered</p>
                                        </div>

                                    </Link>

                                )
                            })}
                        </div>
                    )}
                </div>
            </div>

        </>
    )
}

export default UserAllInformation