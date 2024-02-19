import { useTheme } from "@mui/material";
import React from "react";
import Chart from "react-apexcharts";
import { tokens } from "../../../../theme";

const PieChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const pieChartData = {
    labels: ['Category A', 'Category B', 'Category C'],
    quantities: [70, 30, 20],
  };

  const series = pieChartData.quantities; // Use quantities as the series data
  const labels = pieChartData.labels; // Use quantities as the series data

  const options = {
    title: {
      text: "Student PieChart",
      style: {
        color: `${colors.greenAccent[400]}`, // Set your desired text color
    },
    },
    noData: { text: "Empty Data" },
    //colors: ["#f90000", "#f0f"],
    labels: labels
  };

  return (
    <div className="container-fluid mb-3">
      <Chart
        type="pie"
        width={400}
        height={250}
        series={series}
        options={options}
      />
    </div>
  );
};

export default PieChart;
