import React from 'react';
import "./Home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";

const Home = () => {
  return (
    <div className = "home">
        {/* <h1 className="title">DASH BOARD</h1> */}
        <Sidebar/>
        <div className="homeContainer">
          <Navbar/>
          <div className="widgets">
            <Widget/>
            <Widget/>
            <Widget/>
          </div>
          
        </div>
    </div>
  )
}

export default Home;