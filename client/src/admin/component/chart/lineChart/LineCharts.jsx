import { useTheme } from '@mui/material';
import React, { useState } from 'react'
import Chart from 'react-apexcharts';
import { tokens } from '../../../../theme';

const LineCharts = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    const [product, setProduct] = useState(
        [
            {
                name: "T-shirt",
                data: [234, 45, 67, 987, 345, 456, 87, 321, 45, 569, 76, 890]
            },
            {
                name: "Shirt",
                data: [562, 145, 267, 97, 45, 156, 87, 321, 845, 969, 706, 20]
            },
            {
                name: "Jeans",
                data: [1012, 345, 117, 697, 845, 56, 287, 1321, 1845, 469, 306, 120]
            }
        ]
    );

    const [option, setOption] = useState({
        title: {
          text: 'Product sell in 2021',
          style: {
            color: `${colors.greenAccent[400]}`, // Set your desired text color
          },
        },
        xaxis: {
          title: {
            text: 'Product Sell in Months',
            style: {
                color: `${colors.greenAccent[400]}`, // Set your desired text color
            },
          },
          labels: {
            style: {
                color: `${colors.greenAccent[400]}`, // Set your desired text color for x-axis categories
            },
          },
          categories: [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
          ],
        },
        yaxis: {
          title: {
            text: 'Product in K',
            style: {
                color: `${colors.greenAccent[400]}` // Set your desired text color
            },
          },
        },
      });
    
    return (
        <>

            <div className='mt-3 mb-3'>
                <Chart type='line'
                    // width={490}
                    // height={550}
                    series={product}
                    options={option}
                >
                </Chart>

            </div>
        </>
    )
}

export default LineCharts