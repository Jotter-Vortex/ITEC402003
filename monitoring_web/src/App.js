import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Details from "./pages/details/Details"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
    {/* React-Router-Dom -> 페이지간 링크 구축*/}
     <Routes>
       <Route path="/">
         <Route index element = {<Home/>}></Route>
         <Route path="login" element={<Login/>}></Route>
         <Route path="details" element={<Details/>}></Route>
       </Route>
     </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
