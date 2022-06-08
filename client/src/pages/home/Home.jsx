import React from 'react';
import "./Home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Widget2 from "../../components/widget/Widget2";
import Widget3 from "../../components/widget/Widget3";
import Chart1 from "../../components/chart/Chart1";
import Chart2 from "../../components/chart/Chart2";
import REPORT_TABLE from "../../components/report_table/Report_table";


// import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
// import SaveIcon from '@mui/icons-material/Save';
// import PrintIcon from '@mui/icons-material/Print';
// import ShareIcon from '@mui/icons-material/Share';

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
            <Chart1/>
            <Chart2/>
          </div> 
          <div className="ReportTableContainer">
            <div className="ReportTable">
              {/* 리포트 테이블 */}
              <REPORT_TABLE/>
            </div>
            </div>  
        </div>
    </div>
  )
}

// const actions = [
//   { icon: <FileCopyIcon />, name: 'Copy' },
//   { icon: <SaveIcon />, name: 'Save' },
//   { icon: <PrintIcon />, name: 'Print' },
//   { icon: <ShareIcon />, name: 'Share' },
// ];

export default Home;