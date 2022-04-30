import {AiOutlineBarChart} from 'react-icons/ai'

function Body() {
  return (
    <div style={{display: "flex", justifyContent: "flex-start"}}>
        <AiOutlineBarChart size={80}/> <h1 style = {bodyStyle}> Dashboard</h1>
    </div>
  )
}


const bodyStyle = {
    color: 'black',
}

export default Body