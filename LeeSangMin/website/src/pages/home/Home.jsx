import React from 'react';
import "./Home.scss";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
  return (
    <div className = "home">
        <h1 className="title">DASH BOARD</h1>
        <Sidebar/>
    </div>
  )
}

export default Home;