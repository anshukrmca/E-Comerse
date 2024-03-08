import { LinearProgress, linearProgressClasses, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { tokens } from '../../../theme';

const Ordertracking = ({ Order }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [status, setstatus] = useState("")
    const [Value, setValue] = useState(0)
    const [createTime, setcreateTime] = useState(null)
    const [updateTime, setupdateTime] = useState(null)

    // console.log(Order[0].createdAt)
    // console.log(Order[0].updatedAt)

    useEffect(() => {
        setstatus(Order && Order[0].orderStatus);

        const newDateTime = new Date(Order && Order[0].createdAt);
        newDateTime.setDate(newDateTime.getDate() + 7);
        const createDataTime = new Date(newDateTime).toLocaleString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          });
          const updateDataTime = new Date(Order && Order[0].updatedAt).toLocaleString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          });
          setcreateTime(createDataTime);
          setupdateTime(updateDataTime);
      
    }, [Order])


    useEffect(() => {
        if (status == 'PLACED') {
            setValue(25)
        } else if (status == 'CONFIRMED') {
            setValue(50)
        }
        else if (status == 'SHIPPED') {
            setValue(75)
        }
        else if (status == 'DELIVERED') {
            setValue(100)
        }
        else if (status == 'CANCELLED') {
            setValue(100)
        }
    })
    return (
        <div className='mx-2 md:mx-8 shadow-sm mb-4 p-4' style={{ backgroundColor: `${colors.primary[400]}` }}>
            <div className="md:flex justify-between mb-3">
                <div className="flex">
                    <h5>ORDER No : <span className="text-indigo-600 font-bold">{Order && Order[0]._id}</span></h5>
                </div>
                <div className="">
                    <p className="mb-1">Expected Arrival <span>{createTime}</span></p>
                    <p>Order Updated At : <span className="font-bold">{updateTime}</span></p>
                </div>
            </div>
            <LinearProgress sx={{
                height: '7px', borderRadius: 5,
                [`& .${linearProgressClasses.bar}`]: {
                    borderRadius: 5,
                    backgroundColor:
                        status === 'CANCELLED' ? 'red' :
                            status === 'DELIVERED' ? 'green' :
                                '#1a90ff',
                }
            }}
                variant="determinate" value={Value} />
            <div className='flex justify-between mt-2'>
                <p>Placed</p>
                <p>Confirmed</p>
                <p>Shipped</p>
                {status == 'Cancelled' ?
                    <p>Cancelled</p>
                    :
                    <p>Delivered</p>
                }
            </div>
            {updateTime}
        </div>
    )
}

export default Ordertracking