import React, { useState, useEffect } from 'react';
import "./Navbar.scss"
import NightlightIcon from '@mui/icons-material/Nightlight';
import LanguageIcon from '@mui/icons-material/Language';
import moment from 'moment';

let timer: any = null;

const Navbar = () => {

  const [time, setTime] = useState(moment()); //useState 훅을 통해 time 값 디폴트 설정

  useEffect(() => {
     timer = setInterval(() => { //timer 라는 변수에 인터벌 종료를 위해 저장  
       setTime(moment()); // 현재 시간 세팅 
     }, 1000); //1000ms = 1s 간 반복 
     return () => {
       clearInterval(timer); // 함수 언마운트시 clearInterval 
     };
   }, []);

  

  return (
    <div className="navbar">
      <div className="navbar_clock">
        {time.format('YYYY-MM-DD HH:mm:ss')}
      </div>
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