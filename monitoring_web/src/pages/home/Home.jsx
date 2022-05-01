import React from 'react';
import "./Home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Chart from "../../components/chart/Chart";
import Chart2 from "../../components/chart/Chart2";

const Home = () => {
  return (
    <div className = "home">
        {/* <h1 className="title">DASH BOARD</h1> */}
        <Sidebar/>
        <div className="homeContainer">
          <Navbar/>
          <div className="widgets">
            <Widget />
            <Widget/>
            <Widget/>
          </div>
          <div className="charts">
            <Chart/>
            <Chart2/>
          </div>   
        </div>
    </div>
  )
}

export default Home;