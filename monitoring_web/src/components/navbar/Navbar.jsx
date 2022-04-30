import React from 'react'
import "./Navbar.scss"
import NightlightIcon from '@mui/icons-material/Nightlight';
import LanguageIcon from '@mui/icons-material/Language';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          {/* <input type="text" placeholder="search.." /> */}
        </div>
        <div className="items">
          <div className="item">
            <LanguageIcon className="icon"/>
          </div>
          <div className="item">
            <NightlightIcon className="icon"/>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Navbar