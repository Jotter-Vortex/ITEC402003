import React from 'react'
import "./Sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import BarChartIcon from '@mui/icons-material/BarChart';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsIcon from '@mui/icons-material/Settings';
import {Link} from "react-router-dom"



const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{textDecoration:"none"}}>
          <span className="logo">DASH BOARD</span>
        </Link>
      </div>
      <hr/>
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{textDecoration:"none"}}>
            <li>
              <DashboardIcon className="icon"/>
              <span>Dashboard</span>
            </li>
          </Link>
          <Link to="/details" style={{textDecoration:"none"}}>
            <li>
              <ContentPasteSearchIcon className="icon"/>
              <span>Details</span>
            </li>
          </Link>
          <li>
            <BarChartIcon className="icon"/>
            <span>Charts</span>
          </li>
          <p className="title">SERVICE</p>
          <li>
            <NotificationsNoneIcon className="icon"/>
            <span>Alarm</span>
          </li>
          <li>
            <SettingsIcon className="icon"/>
            <span>Settings</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      </div>
    
    </div>
  )
}

export default Sidebar