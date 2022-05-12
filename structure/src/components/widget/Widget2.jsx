import "./Widget.scss";
import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Legend, Cell, ResponsiveContainer } from 'recharts';
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios"

var H = 0, M = 0, L = 0

class Widget2 extends React.Component {
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
        
        H = 0; M = 0; L = 0;
        for (var i = 0; i < data.length; i++) {          
          if (data[i].Severity === 'High') {
            H++
          }
  
          else if (data[i].Severity === 'Medium') {
            M++
          }
  
          else {
            L++
          }
        }        
      })

      .catch(() => {
        alert('Error detected');
      })
  }

  render() {
    data[0].value = H
    data[1].value = M
    data[2].value = L
    console.log(data)
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
                <Legend verticalAlign="bottom" layout="vertical" />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* <p className="title">Total</p>
        <p className="title">Total</p> */}
        </div>
      </div>
    )
  }
}

const index = 0;

const data = [
  { name: 'High Severity', value: 1 },
  { name: 'Middle Severity', value: 2 },
  { name: 'Low Severity', value: 3 },
];

const COLORS = ['#f34338', '#ff9f31', '#008d62'];


export default Widget2