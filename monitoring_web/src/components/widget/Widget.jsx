/* eslint-disable */

import "./Widget.scss";
import React from 'react';
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import {useContext } from 'react';
import "react-circular-progressbar/dist/styles.css";
import dbContext from "../../db/DbContext";

var contents_high = 0, contents_medium = 0, contents_low = 0
var recent_contents_high = 0, recent_contents_medium = 0, recent_contents_low = 0
var total_report_count =0


const Widget = () => {

  const { Content, rHigh, rMiddle, rLow, rTotal, tHigh, tMiddle, tLow, tTotal } = useContext(dbContext)

  dataset(Content)

  const data = [
    {
      subject: 'Total',
      A: tTotal,
      B: rTotal,
      fullMark: 0,
    },
    {
      subject: 'High',
      A: rTotal,
      B: rHigh,
      fullMark: 50,
    },
    {
      subject: 'Middle',
      A: tMiddle,
      B: rMiddle,
      fullMark: 50,
    },
    {
      subject: 'Low',
      A: tLow,
      B: rLow,
      fullMark: 50,
    },
  
  ]

  // const data = [
  //   {
  //     subject: 'Total',
  //     A: (contents_high+contents_medium+contents_low)/total_report_count,
  //     B: recent_contents_high+recent_contents_medium+recent_contents_low,
  //     fullMark: 0,
  //   },
  //   {
  //     subject: 'High',
  //     A: contents_high/total_report_count,
  //     B: recent_contents_high,
  //     fullMark: 50,
  //   },
  //   {
  //     subject: 'Middle',
  //     A: contents_medium/total_report_count,
  //     B: recent_contents_medium,
  //     fullMark: 50,
  //   },
  //   {
  //     subject: 'Low',
  //     A: contents_low/total_report_count,
  //     B: recent_contents_low,
  //     fullMark: 50,
  //   },
  
  // ]

  console.log(data)

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
          <PolarRadiusAxis angle={45} domain={[0, 5]} />
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


function dataset(Content) {

  // 값 초기화
  contents_high = 0, contents_medium = 0, contents_low = 0
  recent_contents_high = 0, recent_contents_medium = 0, recent_contents_low = 0
  total_report_count =0
  
  
    var isRecent =1;
  
    //전체 data 생성
    const element_1 = Content.map((item_1) =>{
      const inner_elements_1 = item_1.map((Inneritem_1)=>{
        //console.log(Inneritem_1)
        if(Inneritem_1.Severity === 'High'){
          contents_high++
          if(isRecent===1){
            recent_contents_high++
            //console.log("recent_contents_high :" + recent_contents_high)  
          }
          //console.log("contents_high :" + contents_high)
        }
        else if(Inneritem_1.Severity === 'Medium'){
          contents_medium++
          if(isRecent===1){
            recent_contents_medium++
            //console.log("recent_contents_medium :" + recent_contents_medium)  
          }
          //console.log("contents_medium :" + contents_medium)
        }
        else if(Inneritem_1.Severity === 'Low'){
          contents_low++
          if(isRecent===1){
            recent_contents_low++
            //console.log("recent_contents_low :" + recent_contents_low)  
          }
          //console.log("contents_low :" + contents_low)
        }  
      })
      isRecent =0;
      total_report_count++
      //console.log("total count : " + total_report_count)
    })
  
  }



export default Widget