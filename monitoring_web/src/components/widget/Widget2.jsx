/* eslint-disable */

import "./Widget.scss";
import React from 'react';
import { PieChart, Pie, Legend, Cell, ResponsiveContainer } from 'recharts';
import "react-circular-progressbar/dist/styles.css";
import dbContext from "../../db/DbContext";
import {useContext } from 'react';


var recent_contents_high = 0, recent_contents_medium = 0, recent_contents_low = 0


const Widget2 = () => {

  const {Content} = useContext(dbContext)

  dataset(Content)

  const data = [
    { name: 'High Severity', value: recent_contents_high },
    { name: 'Middle Severity', value: recent_contents_medium },
    { name: 'Low Severity', value: recent_contents_low },
  ];

  return (
    <div className="widget">
      <div className="top">
        <h1 className="title">Recent Vulnerability</h1>
      </div>
      <hr/>
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
const index =0;



const COLORS = ['#f34338', '#ff9f31', '#008d62'];


function dataset(Content){
  // 값 초기화
  recent_contents_high = 0, recent_contents_medium = 0, recent_contents_low = 0
 
  var isRecent =1;
    //전체 data 생성
    const element_1 = Content.map((item_1) =>{
      const inner_elements_1 = item_1.map((Inneritem_1)=>{
        if(Inneritem_1.Severity === 'High'){
          if(isRecent===1){
            recent_contents_high++
            //console.log("recent_contents_high :" + recent_contents_high)  
          }
        }
        else if(Inneritem_1.Severity === 'Medium'){
          if(isRecent===1){
            recent_contents_medium++
            //console.log("recent_contents_medium :" + recent_contents_medium)  
          }
        }
        else if(Inneritem_1.Severity === 'Low'){
          if(isRecent===1){
            recent_contents_low++
            //console.log("recent_contents_low :" + recent_contents_low)  
          }
        }     
      })
      isRecent =0;
    })
  }


export default Widget2