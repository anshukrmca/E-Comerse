import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
// import "./pieChartBox.scss";

const data = [
  { name: "Mobile", value: 400, color: "#0088FE" },
  { name: "Desktop", value: 300, color: "#00C49F" },
  { name: "Laptop", value: 300, color: "#FFBB28" },
  { name: "Tablet", value: 200, color: "#FF8042" },
  { name: "Tablet", value: 200, color: "#FF8042" },
  { name: "Tablet", value: 200, color: "#FF8042" },
  { name: "Tablet", value: 200, color: "#FF8042" },
];
const PaiChart = () => {
  return (
    <>
      {/* <div className="pieChartBox h-full flex flex-col justify-between m-8"> */}
        <h1 className="xxl:text-24">Leads by Source</h1>
        <div className="">
          <ResponsiveContainer width="99%" height={250}>
            <PieChart>
              <Tooltip
                contentStyle={{ background: "white", borderRadius: "5px" }}
              />
              <Pie
                data={data}
                innerRadius={"70%"}
                outerRadius={"90%"}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((item) => (
                  <Cell key={item.name} fill={item.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap justify-around text-14">
          {data.map((item) => (
            <div
              className="items-center text-center mb-4 md:mb-0 md:w-1/3 lg:w-1/4"
              key={item.name}
            >
              <div className="title flex gap-2 items-center">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.name}</span>
              <span>{item.value}</span>

              </div>
            </div>
          ))}
        </div>
    </>
  );
};

export default PaiChart;
