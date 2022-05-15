import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Details from "./pages/details/Details"
import Chart from "./pages/charts/Chart"
import React, { useState } from "react"
import { DbProvider } from "./db/dbContext"

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <DbProvider>
        <BrowserRouter>
          {/* React-Router-Dom -> 페이지간 링크 구축*/}
          <Routes>
            <Route path="/">
              <Route index element={<Home />}></Route>
              <Route path="login" element={<Login />}></Route>
              <Route path="details" element={<Details />}></Route>
              <Route path="chart" element={<Chart />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </DbProvider>
    </div>
  );
}

export default App;
