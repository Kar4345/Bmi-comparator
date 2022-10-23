import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function Chart({ data }) {
  return (
    <div
      id="chart"
      style={{
        width: "100%",
        height: 400,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ResponsiveContainer>
        <ComposedChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" scale="auto" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* <Area type="monotone" dataKey="Bmi" fill="#8884d8" stroke="#8884d8" /> */}
          <Bar dataKey="Bmi" barSize={30} fill="#000278" />
          {/* <Line type="monotone" dataKey="Bmi" stroke="#ff7300" /> */}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
