import React from 'react'
import "./Reportpage.scss";
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { useLocation } from 'react-router-dom';

const Reportpage = () => {

    const location = useLocation()
    const {DBurl} = location.state;
    console.log(DBurl)
  return (
    <div className="ReportPage">
        <Sidebar/>   
        <div className="ReportPageContainer">
            <Navbar/>
            <div className="ReportContent">
                <h1>Detailed Report</h1>
                <h2>Diagnosis Time : {DBurl}</h2>
                
            </div>             
        </div>
    </div>

  )
}


export default Reportpage