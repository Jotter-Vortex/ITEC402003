import "./Details.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import React from 'react'

const Details = () => {
  return (
    <div className="Details">
        <Sidebar/>
        <div className="DetailsContainer">
            <Navbar/>
            Details
        </div>
    </div>
  )
}

export default Details