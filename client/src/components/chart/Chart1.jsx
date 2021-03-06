import "./Chart1.scss";
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import dbContext from "../../db/DbContext";
import { useContext } from 'react';

const Chart1 = () => {

  const { Content, nveArray } = useContext(dbContext)

  const data = [
    {
      name: '',
      NVE: 0,
    },
  ];

  const newData = data.concat();
  for (var i = 0; i < nveArray.length; i++) {
    newData.push({ name: nveArray[i].time.substring(0, 10), NVE: nveArray[i].nve })
  }

  // const newData = data.concat();
  // newData.shift();
  // for(var i =0; i<Content.length; i++){
  //   var timestamp = Content[i][0].Timestamp.substring(0,10)
  //   newData.push({name: timestamp, NVE: Content[i].length})
  // }

  // console.log(newData)

  return (
    <div className="chart_card">
      <div className="center">
        <div className="title">
          NVE Report
        </div>
        <hr />
        <div className="chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={newData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="NVE" stroke="#8884d8" activeDot={{ r: 5 }} />
              {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}


export default Chart1