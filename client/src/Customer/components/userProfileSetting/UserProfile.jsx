import React, { useEffect, useState } from 'react'
import HeaderTittle from '../HeaderTittle'
import { Button, Grid, } from '@mui/material';
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai';
import axios from 'axios';
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { useTheme } from '@emotion/react';
import { tokens } from '../../../theme';

const UserProfile = () => {
  const token = localStorage.getItem("token");
  const [name, setName] = useState('')
  const [C_name, setC_Name] = useState('')
  const [email, setEmail] = useState('')
  const [C_email, setC_Email] = useState('')
  const [password, setPassword] = useState('')
  const [profilePic, setProfilePic] = useState('')
  const [DOJ, setDOJ] = useState('')
  const [Edit,setEdit]= useState(true)
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  useEffect(() => {

    if (token) {
      const fetchData = async () => {
        try {
          const response = await axios.get("/api/auth/profile", {
            withCredentials: true,
          });
          const data = response.data.user;
          setName(data.name)
          setC_Name(data.name)
          setEmail(data.email)
          setC_Email(data.email)
          setProfilePic(data.profilePicture)
          setDOJ( new Date(data.createdAt).toLocaleString())

        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchData();
    }
  }, [token])


  return (
    <>
      <HeaderTittle tittle="Profile" subtitle={"profile details"}/>
      <div>
        <div className="md:col-span-4">
          <div className="flex flex-col items-center text-center p-3 py-5">
            <img
              className="rounded-circle mb-3 min-[200px] rounded-full"
              width="300px"
              height="300px"
              src={profilePic}
              alt=""
            />
            <span className="font-bold text-xl">{name}</span>
            <span className="text-gray-500 text-sm md:text-xl break-words">{email}</span>
          </div>
        </div>
        <div className="md:col-span-8 border-l">
          <div className="p-3 py-5">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-right">Profile Details</h4>
              <div className="space-x-2">
                <Link className='flex gap-3'>
                {Edit &&  <AiOutlineEdit onClick={()=>{setEdit(!Edit)}} size={35} className="text-yellow-500 text-2xl p-2 rounded-full" style={{backgroundColor:`${colors.primary[400]}`}} />}
                  {!Edit && 
                 <>
                  <FaCheck onClick={()=>{
                    alert("updatre")
                   setEdit(true)}} size={35} className="text-green-500 text-2xl p-2 rounded-full" style={{backgroundColor:`${colors.primary[400]}`}}/>
                  <IoClose onClick={()=>{setEdit(true)}} size={35} className="text-red-500 text-2xl p-2 rounded-full" style={{backgroundColor:`${colors.primary[400]}`}}/>

                 </>
                }
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4" style={{backgroundColor:`${colors.primary[400]}`}}>
              <div className="mb-3">
                <div className="font-semibold">Name</div>
                <div className="">
                  <input
                  readOnly={Edit}
                    type='text'
                    value={C_name}
                    onChange={(e)=>{setC_Name(e.target.value)}}
                    className="w-full p-2 border-[1px] border-slate-900 rounded-md focus:outline-none focus:border-blue-500 transition duration-300 bg-transparent"
                    placeholder="Enter text..."
                  />

                </div>
              </div>
              <div className="mb-3">
                <div className="font-semibold">Email</div>
                <input
                  type='text'
                  readOnly={Edit}
                  onChange={(e)=>{setC_Email(e.target.value)}}
                  value={C_email}
                  className="w-full p-2 border-[1px] border-slate-900 rounded-md focus:outline-none focus:border-blue-500 transition duration-300 bg-transparent"
                  placeholder="Enter text..."
                />
              </div>
              <div className="mb-3">
                <div className="font-semibold">Password</div>
                <input
                  type='text'
                  value={password}
                  readOnly={Edit}
                  onChange={(e)=>{setPassword(e.target.value)}}
                  className="w-full p-2 border-[1px] border-slate-900 rounded-md focus:outline-none focus:border-blue-500 transition duration-300 bg-transparent"
                  placeholder="Enter text..."
                />
              </div>
              <div className="mb-3">
                <div className="font-semibold mb-3">Account Created Date</div>
                <label>{DOJ}</label>
              </div>
            </div>
          </div>
        </div>
      </div>



    </>
  )
}

export default UserProfile