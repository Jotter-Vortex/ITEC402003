import "./Chart2.scss";
import React from 'react';
import { Treemap, ResponsiveContainer } from 'recharts';
import { PureComponent } from 'react';
import dbContext from "../../db/DbContext";
import { useContext } from 'react';

const Chart2 = () => {
  const { vtype } = useContext(dbContext)
  const data = [{ name : '', size : 0 }]

  for(var i = 0; i < vtype.length; i++) {
    data.push( {name : vtype[i].name, size : Math.round(10 / vtype.length)})
  }

    return (
        <div className = "chart_card">
            <div className="center">
                <div className="title">
                    Vulnerability Type
                </div>
                {/* <hr /> */}
                <div className = "chart">  
                <ResponsiveContainer width="95%" height="100%">
                <Treemap
                  width={400}
                  height={200}
                  data={data}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 500,
                    bottom: 0,
                }}
                  
                  dataKey="size"
                  ratio={4 / 3}
                  stroke="#fff"
                  fill="#8884d8"
                  content={<CustomizedContent colors={COLORS} />}
                />
              </ResponsiveContainer>
                </div>         
            </div>
        </div>      
  )
}

// const data = [
//   {
//     name: 'Cleartext Transmission',
//     children: [
//       { size: 3 },
//     ],
//   },
//   {
//     name: 'SSL/TLS',
//     children: [
//       { name: 'SSL/TLS', size: 2 },
//     ],
//   },
//   {
//     name: 'others',
//     children: [
//       { name: 'others', size: 1 },
//     ],
//   },
//   {
//     name: 'others2',
//     children: [
//       { name: 'others', size: 1 },
//     ],
//   },
//   {
//     name: 'others3',
//     children: [
//       { name: 'others', size: 1 },
//     ],
//   },
//   {
//     name: 'others3',
//     children: [
//       { name: 'others', size: 1 },
//     ],
//   },
  
// ];

const COLORS = ['#dbc981', '#003458', '#008d62', '#464964', '#800000', '#392f31'];

class CustomizedContent extends PureComponent {
  render() {
    const { root, depth, x, y, width, height, index, colors, name } = this.props;
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: depth < 2 ? colors[Math.floor((index / root.children.length) * 6)] : 'none',
            stroke: '#fff',
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10),
          
          }}
        />
        {depth === 1 ? (
          <text x={x + width / 2} y={y + height / 2 + 7} 
            textAnchor="middle"
            fill="#fff" 
            fontSize={20}
            // scaleToFit={true}
            >
              {name}
          </text>
        ) : null}
        {depth === 1 ? (
          <text x={x + 10} y={y + 28} fill="#fff" fontSize={25} fillOpacity={0.9}>
            {index}
          </text>
        ) : null}
      </g>
    );
  }
}

export default Chart2