import Header from "./components/Header";
import Body from "./components/Body";
import Tabs from "./components/Tabs"
import Tables from "./components/Tables";
import Donuts from "./components/Donuts";

function App() {
  return (
    <div className = 'container'>
      <Header />
      <Body />
      <Tabs />
      <Donuts />
      <Tables />
    </div>
  )
}

export default App;
