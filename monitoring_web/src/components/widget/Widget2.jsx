import "./Widget.scss";
import React, { PureComponent, useState, useContext } from 'react';
import { PieChart, Pie, Sector, Legend, Cell, ResponsiveContainer } from 'recharts';
import { CircularProgressbar } from "react-circular-progressbar";
import { PieChart, Pie, Legend, Cell, ResponsiveContainer } from 'recharts';
import "react-circular-progressbar/dist/styles.css";
import dbContext from "../../db/dbContext";

const Widget2 = () => {
  const { report, High, Middle, Low } = useContext(dbContext)

  const index = 0;

  const data = [
    { name: 'High Severity', value: High },
    { name: 'Middle Severity', value: Middle },
    { name: 'Low Severity', value: Low },
  ];

  const COLORS = ['#f34338', '#ff9f31', '#008d62'];


  return (
    <div className="widget">
      <div className="top">
        <h1 className="title">Recent Vulnerability</h1>
      </div>
      <hr />
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
              <Legend verticalAlign="bottom" layout="vertical" font-size="50px" />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* <p className="title">Total</p>
        <p className="title">Total</p> */}
      </div>
    </div>
  )
}

export default Widget2