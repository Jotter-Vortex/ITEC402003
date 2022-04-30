import React, { Component } from 'react'
import DonutChart from 'react-donut-chart';

export class Donuts extends Component {
    render() {
        return (
            <div>
                <DonutChart
                    data={[{
                        label: 'very high',
                        value: 20,
                        colors: 'red',
                    },

                    {
                        label: 'high',
                        value: 20,
                        colors: 'pink',
                    },

                    {
                        label: 'middle',
                        value: 20,
                        colors: 'orange',
                    },

                    {
                        label: 'low',
                        value: 20,
                        colors: 'yellow',
                    },

                    {
                        label: 'very low',
                        value: 20,
                        colors: 'green',
                    },
                    ]}
                />;
            </div>
        )
    }
}

export default Donuts