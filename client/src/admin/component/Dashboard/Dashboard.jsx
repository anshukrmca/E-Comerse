import React, { useEffect, useState } from 'react'
import Widget from '../widget/Widget'
import axios from 'axios'
import Chart from '../chart/Chart';


const Dashboard = () => {
  const [DashoBoardData, setDashoBoardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/admin/orders/dashboardData');
        setDashoBoardData(response.data.DBInfo)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, []);


  return (
    <div>
      <Widget DashoBoardData={DashoBoardData}/>
      <Chart/>
    </div>
  )
}

export default Dashboard