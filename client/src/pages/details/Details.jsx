import "./Details.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import React from 'react'
import { Link } from "react-router-dom"
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
import { useContext } from 'react';

const Details = () => {
  const { details } = useContext(dbContext)

  return (
    <div className="Details">
      <Sidebar />
      <div className="DetailsContainer">
        <Navbar />
        <div className="TableContainers">
          {/* <Link to="/details/reportpage" 
                state={{ DBurl: "db에서 해당하는 timestamp 값 넘겨주기" }}>
              <h3>여기 클릭하면 넘어감</h3>
            </Link> */}
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table" >
              <TableHead>
                <TableRow >
                  <TableCell />
                  <TableCell sx={{ fontSize: 17 }}>Diagnosis Date</TableCell>
                  <TableCell sx={{ fontSize: 17 }} align="center">Hostname</TableCell>
                  <TableCell sx={{ fontSize: 17 }} align="center">IP</TableCell>
                  <TableCell sx={{ fontSize: 17 }} align="center">Number of vulnerabilities found</TableCell>
                  <TableCell sx={{ fontSize: 17 }} align="center">Warning</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {details.map((row) => (
                  <Row key={row.Timestamp} row={row} details={details}/>
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
// function createData(Timestamp, Hostname, IP, NumberOfFound, Warning, Details, Summary, SpecificResult) {
//   return {
//     Timestamp,
//     Hostname,
//     IP,
//     NumberOfFound,
//     Warning,
//     Details,
//     Summary,
//     SpecificResult,
//   };
// }

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

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
        <TableCell component="th" scope="row" sx={{ fontSize: 15 }}>
          <Link to="/details" style={{ textDecoration: "none" }}
            state={{ DBurl: row.Timestamp }}>
            {row.Timestamp}
          </Link>
        </TableCell>
        <TableCell sx={{ fontSize: 15 }} align="center">{row.Hostname}</TableCell>
        <TableCell sx={{ fontSize: 15 }} align="center">{row.IP}</TableCell>
        <TableCell sx={{ fontSize: 15 }} align="center">{row.NumberOfFound}</TableCell>
        <TableCell sx={{ fontSize: 15 }} align="center">{row.Warning}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Detailed Report
              </Typography>
              <Table size="small" aria-label="purchases">
                {/* <div>
                  내용
                </div>
                <div>
                  {row.Timestamp}
                </div> */}
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Result ID</TableCell>
                    <TableCell align="center">Impact</TableCell>
                    <TableCell align="center">Summary</TableCell>
                    <TableCell align="center">NVT Name</TableCell>
                    <TableCell align="center">Solution</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.Details.map((historyRow) => (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {historyRow.Result_ID}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {historyRow.Impact}
                      </TableCell>
                      <TableCell>{historyRow.Summary}</TableCell>
                      <TableCell align="right">{historyRow.NVT_Name}</TableCell>
                      <TableCell align="right">
                        {historyRow.Solution}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default Details