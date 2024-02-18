import React, { useEffect, useState } from "react";
import Widget from "../widget/Widget";
import axios from "axios";
import Chart from "../chart/Chart";
import PaiChart from "../chart/paiChart/PaiChart";
import BarCharts from "../chart/BarChart/BarCharts";
import GraphCharts from "../chart/graphChart/GraphCharts";
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";

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
    <div>
      <Widget DashoBoardData={DashoBoardData} />
      {/* <Chart/> */}
      <div className="md:flex gap-3 justify-between mt-4">
        <div
          className="mb-4 w-full md:w-1/2 border p-4"
          style={{ backgroundColor: `${colors.primary[400]}` }}
        >
          <PaiChart />
        </div>
        <div
          className="mb-4  w-full md:w-1/2 border p-4"
          style={{ backgroundColor: `${colors.primary[400]}` }}
        >
          <BarCharts />
        </div>
      </div>
      <div className="md:flex gap-3 justify-between mt-4">
        <div
          className="mb-4  w-full md:w-1/2 border p-4"
          style={{ backgroundColor: `${colors.primary[400]}` }}
        >
          <GraphCharts />
        </div>
        <div
          className="mb-4  w-full md:w-1/2 border p-4"
          style={{ backgroundColor: `${colors.primary[400]}` }}
        >
          <GraphCharts />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
