import "./Widget.scss";
import React, { PureComponent, useState, useContext } from 'react';
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import {CircularProgressbar} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import dbContext from "../../db/dbContext";

const Widget = () => {

  const { report, High, Middle, Low } = useContext(dbContext)

  console.log(High)
  console.log(Middle)
  console.log(Low)
  const data = [
    {
      subject: 'Total',
      A: 7,
      B: High + Middle + Low,
      fullMark: 0,
    },
    {
      subject: 'High',
      A: 2,
      B: High,
      fullMark: 50,
    },
    {
      subject: 'Middle',
      A: 6,
      B: Middle,
      fullMark: 50,
    },
    {
      subject: 'Low',
      A: 3,
      B: Low,
      fullMark: 50,
    },
  
  ];

  return (
    <div className="widget">
      <div className="top">
        <h1 className="title">Recent Reported Vulnerables</h1>
      </div>
      <hr/>
      <div className="bottom">
        <div className="Vchart">
        <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={45} domain={[0, 10]} />
          <Radar name="Average" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.4} />
          <Radar name="Recent" dataKey="B" stroke="#CC0000" fill="#CC0000" fillOpacity={0.4} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
        </div>
        {/* <p className="title">Total</p>
        <p className="title">Total</p> */}
      </div>
    </div>
  )
}

export default Widget