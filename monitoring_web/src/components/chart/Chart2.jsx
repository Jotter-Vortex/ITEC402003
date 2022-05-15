import "./Chart2.scss";
import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const Chart2 = () => {
    return (
        <div className = "chart_card">
            <div className="center">
                <div className="title">
                    CVT Report
                </div>
                <hr />
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
                    <Line type="monotone" dataKey="NVE" stroke="#8884d8"  />
                    <Line type="monotone" dataKey="CVT" stroke="#82ca9d" activeDot={{ r: 8 }}/>
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
      CVT: 1235, 
    },
    {
      name: '4/7',
      NVE: 1238,
      CVT: 4547,  
    },
    {
      name: '4/14',
      NVE: 5642,
      CVT: 6447, 
    },
    {
      name: '4/21',
      NVE: 125,
      CVT: 354,  
    },
    {
      name: '4/28',
      NVE: 8654,
      CVT: 4478,  
    },
    {
      name: '5/1',
      NVE: 4568,
      CVT: 6658,  
    },
    {
      name: '5/7',
      NVE: 6654,
      CVT: 4547,  
    },
  ];

export default Chart2