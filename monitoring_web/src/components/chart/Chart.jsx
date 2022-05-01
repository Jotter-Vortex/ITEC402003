import "./Chart.scss";
import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const Chart = () => {
    return (
        <div className = "chart_card">
            <div className="center">
                <div className="title">
                    NVE Report
                </div>
                <div className = "chart">  
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                    width={500}
                    height={300}
                    data={data}
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
                    <Line type="monotone" dataKey="NVE" stroke="#8884d8" activeDot={{ r: 8 }} />
                    {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                    </LineChart>
                </ResponsiveContainer>  
                </div>         
            </div>
        </div>



           
  )
}


const data = [
    {
      name: '4/1',
      NVE: 4658, 
    },
    {
      name: '4/7',
      NVE: 1238, 
    },
    {
      name: '4/14',
      NVE: 5642, 
    },
    {
      name: '4/21',
      NVE: 125, 
    },
    {
      name: '4/28',
      NVE: 8654, 
    },
    {
      name: '5/1',
      NVE: 4568, 
    },
    {
      name: '5/7',
      NVE: 6654, 
    },
  ];

export default Chart