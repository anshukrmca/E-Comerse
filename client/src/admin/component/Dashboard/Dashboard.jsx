import React, { useEffect, useState } from "react";
import Widget from "../widget/Widget";
import axios from "axios";
import Chart from "../chart/Chart";
import PaiChart from "../chart/pieChart/PieChart";
import BarCharts from "../chart/BarChart/BarCharts";
import GraphCharts from "../chart/graphChart/GraphCharts";
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import LineCharts from "../chart/lineChart/LineCharts";
import DonotChart from "../chart/DonotChart/DonotChart";
import PieChart from "../chart/pieChart/PieChart";
import Order4Dashboard from "../order/Order4Dashboard";

const Dashboard = () => {
  const [DashoBoardData, setDashoBoardData] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/admin/orders/dashboardData");
        setDashoBoardData(response.data.DBInfo);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
    

  return (
    <div style={{color:`${colors.greenAccent[400]}`}}>
      <Widget DashoBoardData={DashoBoardData} />
      {/* <Chart/> */}
      <div className="md:flex gap-3 justify-between mt-4">
        <div
          className="mb-4 w-full md:w-1/2  p-4"
          style={{ backgroundColor: `${colors.primary[400]}` }}
        >
          <DonotChart />
        </div>
        <div
          className="mb-4  w-full md:w-1/2  p-4"
          style={{ backgroundColor: `${colors.primary[400]}` }}
        >
          <PieChart />
        </div>
      </div>
      <div className="md:flex gap-3 justify-between mt-4">
        <div
          className="mb-4  w-full md:w-1/2  p-4"
          style={{ backgroundColor: `${colors.primary[400]}` }}
        >
          <LineCharts />
        </div>
        <div
          className="mb-4 w-full md:w-1/2  p-4"
          style={{ backgroundColor: `${colors.primary[400]}` }}
        >
          <GraphCharts />
        </div>
      </div>
      <div className="md:flex gap-3 justify-between mt-4">
        <div
          className="mb-4  w-full md:w-3/4  p-4"
          style={{ backgroundColor: `${colors.primary[400]}` }}
        >
         <Order4Dashboard />
        </div>
        <div
          className="mb-4 w-full md:w-1/3 p-4"
          style={{ backgroundColor: `${colors.primary[400]}` }}
        >
          <BarCharts />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
