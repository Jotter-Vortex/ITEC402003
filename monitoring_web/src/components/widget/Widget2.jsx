import "./Widget.scss";
import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Legend, Cell, ResponsiveContainer } from 'recharts';
import {CircularProgressbar} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Widget2 = () => {

  return (
    <div className="widget">
      <div className="top">
        <h1 className="title">Recent Vulnerability</h1>
      </div>
      <div className="bottom">
        <div className="Vchart">
          <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              dataKey="value"
              startAngle={180}
              endAngle={0}
              data={data}
              cx="50%"
              cy="80%"
              outerRadius={120}
              fill={COLORS[index]}
              label
            >
              {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            </Pie>
            <Legend verticalAlign="bottom" layout="vertical"/>
          </PieChart>
        </ResponsiveContainer>
        </div>
        {/* <p className="title">Total</p>
        <p className="title">Total</p> */}
      </div>
    </div>
  )
}
const index =0;

const data = [
  { name: 'High Severity', value: 2 },
  { name: 'Middle Severity', value: 6 },
  { name: 'Low Severity', value: 12 },
];

const COLORS = ['#FF0000', '#FF8000', '#006633'];


export default Widget2