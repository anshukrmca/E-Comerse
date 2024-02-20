import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DataLoading from '../../../Customer/components/Loding/DataLoading'
import { useTheme } from '@mui/material'
import { tokens } from '../../../theme'
import HeaderTittle from '../../../Customer/components/HeaderTittle'
import { IoIosMail } from "react-icons/io";
import { FaHandshake } from "react-icons/fa";
import UserInfoModel from './UserInfoModel'




const User = () => {
  const [user, setUser] = useState([])
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false)
  const [Singleuser, setSingleuser] = useState(null)


  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get('/api/user');
      setUser(response.data.users);
    };
    fetchdata()
  }, [])

  return (
    <>
      <div className="" >
        <HeaderTittle tittle={"Users "} subtitle={"all user information !"} />
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 p-4" style={{ backgroundColor: `${colors.primary[400]}` }}>
          {user && user.length > 0 ?
            user.map((item, i) => (
              <div key={i} className="p-4 shadow-sm hover:shadow-2xl hover:border border-gray-500" style={{ backgroundColor: `${colors.primary[400]}` }}>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none h-48">
                  <img
                    src={item.profilePicture}
                    alt="Front of men's Basic Tee in black."
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4">
                  <div className='flex justify-between'>
                    <h3 className="text-sm font-semibold">{item.name}</h3>
                    <p className={`mt-1 text-sm font-light rounded-lg px-2 cursor-pointer ${item.isAdmin === "true" ? 'text-red-700 bg-red-200' : 'text-green-800 bg-green-200'}`}>
                      {item.isAdmin === "true" ? "Admin" : "Customer"}
                    </p>

                  </div>
                  <p className="mt-1 text-sm flex items-center gap-2"><IoIosMail size={20} /> {item.email}</p>
                  <p className="mt-1 text-sm flex items-center gap-2"><FaHandshake size={20} /> {new Date(item.createdAt).toLocaleString()}</p>
                  <button
                    onClick={() => {
                      setOpen(!open);
                      setSingleuser(item )
                    }}
                    className='p-2 rounded-lg mt-2' style={{ backgroundColor: `${colors.blueAccent[800]}` }}>view more</button>
                </div>


              </div>

            ))
            : <DataLoading />}
        </div>
      </div>
      <UserInfoModel open={open} setOpen={setOpen} user={Singleuser} />
    </>
  )
}

export default User