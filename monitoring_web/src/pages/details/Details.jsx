/* eslint-disable */

import "./Details.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import React from 'react'
import {Link} from "react-router-dom"
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import dbContext from "../../db/DbContext";
import {useContext } from 'react';

//같은 timestamp당 1개의 row
// const rows = [
//   createData('2022-04-16T09:27:18Z',"65.61.137.117", "testwebsiteteam2.shop", 9,1
//   , 
//   ),
//   createData('2022-04-15T10:27:18Z',"65.61.137.117", "testwebsiteteam2.shop", 6,0),
//   createData('2022-05-14T15:27:18Z',"65.61.137.117", "testwebsiteteam2.shop", 7,1),
//   createData('2022-05-13T11:27:18Z',"65.61.137.117", "testwebsiteteam2.shop", 5,0),
//   createData('2022-04-12T08:27:18Z',"65.61.137.117", "testwebsiteteam2.shop", 1,2),
//   createData('2022-04-11T07:27:18Z',"65.61.137.117", "testwebsiteteam2.shop", 10,1),
//   createData('2022-04-10T20:27:18Z',"65.61.137.117", "testwebsiteteam2.shop", 8,1),
//   createData('2022-04-09T14:27:18Z',"65.61.137.117", "testwebsiteteam2.shop", 7,0),
//   createData('2022-04-08T18:27:18Z',"65.61.137.117", "testwebsiteteam2.shop", 5,0),
// ];


const rows = [];
const rowsIS = [];
const rowsIScontents = [];

const Details = () => {

  const {Content} = useContext(dbContext)

  var count = 0;
  const element = Content.map((item) =>{
    rowsIScontents.splice(0, rowsIScontents.length)
   const inner_elements = item.map((Inneritem)=>{
    rowsIScontents.push(createDataIS(Inneritem.Impact, Inneritem.Summary))
   })
   rowsIS.push(rowsIScontents)
 })


  rows.splice(0, rows.length)
   for(var i =1; i<=Content.length; i++){
     rows.push(
       createData(
        Content[Content.length-i][0].Timestamp,
        Content[Content.length-i][0].Hostname, 
        Content[Content.length-i][0].IP, 
        Content[Content.length-i].length,
        1,
        rowsIS[Content.length-i],
        rowsIS[Content.length-i]
        ))
    }


  
  //console.log(rowsIS);
  console.log(rows);


  return (
    <div className="Details">
        <Sidebar/>
        <div className="DetailsContainer">
            <Navbar/>
            <div className = "TableContainers">
            {/* <Link to="/details/reportpage" 
                state={{ DBurl: "db에서 해당하는 timestamp 값 넘겨주기" }}>
              <h3>여기 클릭하면 넘어감</h3>
            </Link> */}
              <TableContainer component={Paper}>
              <Table aria-label="collapsible table" >
                <TableHead>
                  <TableRow >
                    <TableCell />
                    <TableCell sx={{ fontSize:17}}>Diagnosis Date</TableCell>
                    <TableCell sx={{ fontSize:17}}  align="center">Hostname</TableCell>
                    <TableCell sx={{ fontSize:17}}  align="center">IP</TableCell>
                    <TableCell sx={{ fontSize:17}}  align="center">Number of vulnerabilities found</TableCell>
                    <TableCell sx={{ fontSize:17}}  align="center">Warning</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <Row key={row.Timestamp} row={row} />
                  ))}
                </TableBody>
              </Table>
              </TableContainer> 
          </div>      
        </div>
    </div>
  )
}





//DB 상세 내용 넣어야 할 부분
function createData(Timestamp, Hostname, IP, NumberOfFound, Warning,Impact, Summary) {
  return {
    Timestamp,
    Hostname,
    IP,
    NumberOfFound,
    Warning,
    Impact, 
    Summary
  };
}

function createDataIS(Impact, Summary) {
  return {
    Impact,
    Summary
    //SpecificResult,
  };
}

function Row(props) {
  const { row} = props;

  const [open, setOpen] = React.useState(false);

  console.log(row)



  const rowISList = row.Impact.map(
    (rowdata, i)=>(
      <div key={i}>
        <h2>
          Detected #{i}
        </h2>
        <p2>
        Problem Summary : {rowdata.Summary}
        </p2>
        <br/>
        <p2>
        Possible Impact : {rowdata.Impact+'\n\n\n'}
        </p2>
        <br/>
        <br/>
        <br/>
        </div>
      // <div key={i}>{rowdata.Impact}</div>
    )
  )



  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="medium"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" sx={{ fontSize:15}}>
        <Link to="/details/reportpage" style={{textDecoration:"none"}}
            state={{ DBurl: row.Timestamp }}>
          {row.Timestamp}
          </Link>
        </TableCell>
        <TableCell sx={{ fontSize:15}} align="center">{row.Hostname}</TableCell>
        <TableCell sx={{ fontSize:15}} align="center">{row.IP}</TableCell>
        <TableCell sx={{ fontSize:15}} align="center">{row.NumberOfFound}</TableCell>
        <TableCell sx={{ fontSize:15}} align="center">{row.Warning}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h4" gutterBottom component="div">
                Detailed Report of {row.Timestamp.substring(0,10)} Test
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                </TableHead>
                <TableBody>
                  {/* {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))} */}
                  <TableCell>
                    <h1>Report</h1>
                    <h2> Target IP : {row.IP}</h2>
                    <h2> Target Hostname : {row.Hostname}</h2>
                    <h2> Detected Vulnerabilities : {row.Impact.length}</h2>
                    <br/><br/>
                    <div>

                    </div>
                    <div>
                      {rowISList}
                    </div>
                    <div>
                      {/* {row.Impact} */}
                    </div>


                  </TableCell>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };



export default Details