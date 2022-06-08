import React from "react";
import "./TopChart.scss"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import dbContext from "../../db/DbContext";
import { useContext } from 'react';


const TopChart = () => {
  const { nveArray, high } = useContext(dbContext)

  const data = [
    {
      name: '',
      NVE: 0,
    },
  ];

  const newData = data.concat();
  for (var i = 0; i < nveArray.length; i++) {
    newData.push({ name: nveArray[i].time.substring(0, 10), NVE: nveArray[i].nve, High : high[i].num })
  }

  console.log(newData)

  return (
    <div className="TopChartContainer">
      <div className="chart">
        <div className="chartComp" style={{ width: '100%' }}>
          <h4>Number Of NVEs</h4>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart
              width={500}
              height={200}
              data={newData}
              syncId="anyId"
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="NVE" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
          <p>Number of High Vulnerabilities</p>

          <ResponsiveContainer width="100%" height={200}>
            <AreaChart
              width={500}
              height={200}
              data={newData}
              syncId="anyId"
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="High" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>

  )

}

// const data = [
//   {
//     name: 'Page A',
//     uv: 4000,
//     pv: 2400,
//   },
//   {
//     name: 'Page B',
//     uv: 3000,
//     pv: 1398,
//   },
//   {
//     name: 'Page C',
//     uv: 2000,
//     pv: 9800,
//   },
//   {
//     name: 'Page D',
//     uv: 2780,
//     pv: 3908,
//   },
//   {
//     name: 'Page E',
//     uv: 1890,
//     pv: 4800,
//   },
//   {
//     name: 'Page F',
//     uv: 2390,
//     pv: 3800,
//   },
//   {
//     name: 'Page G',
//     uv: 3490,
//     pv: 4300,
//   },
// ];


export default TopChart