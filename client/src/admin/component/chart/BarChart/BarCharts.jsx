import React from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";

const barChartBoxVisit = {
  title: "Total Visit",
  color: "#FF8042",
  dataKey: "visit",
  chartData: [
    {
      name: "Sun",
      visit: 4000,
    },
    {
      name: "Mon",
      visit: 3000,
    },
    {
      name: "Tue",
      visit: 2000,
    },
    {
      name: "Wed",
      visit: 2780,
    },
    {
      name: "Thu",
      visit: 1890,
    },
    {
      name: "Fri",
      visit: 2390,
    },
    {
      name: "Sat",
      visit: 3490,
    },
  ],
};

const BarCharts = () => {
  return (
    <>
      <div className="md:flex md:flex-row">
        <div className="w-full">
          <h1 className="text-20 mb-4 md:mb-20">{barChartBoxVisit.title}</h1>
            <ResponsiveContainer width="99%" height={150}>
              <BarChart data={barChartBoxVisit.chartData}>
                <Tooltip
                  contentStyle={{ background: "#2a3447", borderRadius: "5px" }}
                  labelStyle={{ display: "none" }}
                  cursor={{ fill: "none" }}
                />
                <Bar dataKey={barChartBoxVisit.dataKey} fill={barChartBoxVisit.color} />
              </BarChart>
            </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default BarCharts;
