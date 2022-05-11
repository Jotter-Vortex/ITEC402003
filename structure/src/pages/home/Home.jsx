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


/** 메인 대쉬보드 **/

const Home = () => {
  return (
    <div className = "home">
        {/* 사이드바 */}
        <Sidebar/>
        <div className="homeContainer">
          {/* 네비게이션 바 */}
          <Navbar/>
          <div className="widgets">
            {/* 상단 차트 1, 2, 3 */}
            <Widget/>
            <Widget2/>
            <Widget3/>
          </div>
          <div className="charts">
            {/* 하단 차트 1, 2 */}
            <Chart/>
            <Chart2/>
          </div> 
          <div className="ReportTableContainer">
            <div className="ReportTable">
              {/* 리포트 테이블 */}
              <Report_table/>
            </div>
            </div>  
        </div>
    </div>
  )
}

export default Home;