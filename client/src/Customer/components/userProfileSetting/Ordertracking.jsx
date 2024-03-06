import { LinearProgress, linearProgressClasses, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { tokens } from '../../../theme';

const Ordertracking = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [status, setstatus] = useState("Cancelled")
    const [Value, setValue] = useState(10)

    useEffect(() => {
        if (status == 'Placed') {
            setValue(25)
        } else if (status == 'Confirmed') {
            setValue(50)
        }
        else if (status == 'Shipped') {
            setValue(75)
        }
        else if (status == 'Delivered') {
            setValue(100)
        }
        else if (status == 'Cancelled') {
            setValue(100)
        }
    })
    return (
        <div className='mx-2 md:mx-8 shadow-sm mb-4 p-4' style={{ backgroundColor: `${colors.primary[400]}` }}>
            <div className="md:flex justify-between mb-3">
                <div className="flex">
                    <h5>ORDER <span className="text-indigo-600 font-bold">#Y34XDHR</span></h5>
                </div>
                <div className="">
                    <p className="mb-1">Expected Arrival <span>01/12/19</span></p>
                    <p>USPS <span className="font-bold">234094567242423422898</span></p>
                </div>
            </div>
            <LinearProgress sx={{
                height: '7px', borderRadius: 5,
                [`& .${linearProgressClasses.bar}`]: {
                    borderRadius: 5,
                    backgroundColor:
                        status === 'Cancelled' ? 'red' :
                            status === 'Delivered' ? 'green' :
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
        </div>
    )
}

export default Ordertracking