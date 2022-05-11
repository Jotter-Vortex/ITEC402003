import "./Chart.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import React from 'react'
import TopChart from "../../components/chart/TopChart"

const Chart = () => {
  return (
    <div className="Chart">
        <Sidebar/>
        <div className="ChartContainer">
            <Navbar/>
            <div className="TopChart">
                <TopChart/>
            </div>
        </div>
    </div>
  )
}

export default Chart