import React from 'react';
import "./Home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Widget2 from "../../components/widget/Widget2";
import Widget3 from "../../components/widget/Widget3";
import Chart from "../../components/chart/Chart";
import Chart2 from "../../components/chart/Chart2";
import Report_table from "../../components/report_table/Report_table";


const Home = () => {
  return (
    <div className = "home">
        {/* <h1 className="title">DASH BOARD</h1> */}
        <Sidebar/>
        <div className="homeContainer">
          <Navbar/>
          <div className="widgets">
            <Widget/>
            <Widget2/>
            <Widget3/>
          </div>
          <div className="charts">
            <Chart/>
            <Chart2/>
          </div> 
          <div className="ReportTableContainer">
            <div className="ReportTable">
              <Report_table/>
            </div>
            </div>  
        </div>
    </div>
  )
}

export default Home;