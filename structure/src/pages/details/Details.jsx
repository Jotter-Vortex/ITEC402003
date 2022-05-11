import "./Details.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import React from 'react'
import axios from "axios"

class Details extends React.Component {
  state = {
    title: '',
    posts: []
  };

  componentDidMount = () => {
    this.getReport();
  };

  getReport = () => {
    axios.get('http://localhost:8080/api')
    .then((response) => {
      const data = response.data;
      this.setState({posts: data})
      console.log(data)
      console.log('data recieved');
    })

    .catch(() => {
      alert('Error detected');
    })
  }

  render() {
    return (
      <div className="Details">
          <Sidebar/>
          <div className="DetailsContainer">
              <Navbar/>
              {JSON.stringify(this.state.posts)}
              Detail
          </div>
      </div>
    )
  }
}
/*
const Details = () => {
  return (
    <div className="Details">
        <Sidebar/>
        <div className="DetailsContainer">
            <Navbar/>
            Detail
        </div>
    </div>
  )
}
*/
export default Details