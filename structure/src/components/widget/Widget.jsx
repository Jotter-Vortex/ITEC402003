import "./Widget.scss";
import React, { PureComponent } from 'react';
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios"

var Total = 0, High = 0, Medium = 0, Low = 0

class Widget extends React.Component {
  state = {
    title: '',
    posts: []
  };

  componentDidMount = () => {
    this.getReport();
  };

  getReport = () => {    
    axios.get('http://localhost:8080/api')
      .then((response) => {
        const data = response.data;
        this.setState({ posts: data })
        Total = 0; High = 0; Medium = 0; Low = 0;
        for (var i = 0; i < data.length; i++) {          
          if (data[i].Severity === 'High') {
            High++
          }
  
          else if (data[i].Severity === 'Medium') {
            Medium++
          }
  
          else {
            Low++
          }
        }
  
        Total = (High + Medium + Low)
      })

      .catch(() => {
        alert('Error detected');
      })
  }

  render() {
    data[0].B = Total
    data[1].B = High
    data[2].B = Medium
    data[3].B = Low
    console.log(Medium)
  
    return (
      <div className="widget">
        <div className="top">
          <h1 className="title">Recent Reported Vulnerables</h1>
        </div>
        <hr />
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
}

const data = [
  {
    subject: 'Total',
    A: 7,
    B: Total,
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
    B: Medium/2,
    fullMark: 50,
  },
  {
    subject: 'Low',
    A: 3,
    B: Low/2,
    fullMark: 50,
  },
];


export default Widget