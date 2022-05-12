import React from 'react'
import "./Report_table.scss"
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
import axios from "axios"

class Report_table extends React.Component {
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
        this.setState({ posts: data })
        
        for (var i = 0; i < data.length; i++) {
          rows[i].date = data[i].Timestamp;
          rows[i].IP = data[i].IP;
        }
      })

      .catch(() => {
        alert('Error detected');
      })
  }

  render() {
    console.log("here")
    console.log(rows[0].history[0])
    return (
      <div className="report_table">
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Diagnosis Date</TableCell>
                <TableCell align="center">Reported Vulnerabilities</TableCell>
                <TableCell align="center">IP</TableCell>
                <TableCell align="center">Solved</TableCell>
                <TableCell align="center">Notice</TableCell>

                {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }
}

function createData(
  date: string,
  Vulnerabilities: number,
  IP: string,
  Solved: number,
  Notice: number,
) {
  return {
    date,
    Vulnerabilities,
    IP,
    Solved,
    Notice,
    history: [
      {
        date: 'Tue Apr 26 06:30:00 2022 UTC',
        NVT: 'Cleartext Transmission of Sensitive Information via HTTP',
        Threat: 'Medium',
        Details: "The host application transmits sensitive information (username, passwords) in cleartext via HTTP.",
      },
      {
        date: 'Thu Apr 27 06:30:00 2022 UTC',
        NVT: 'Cleartext Transmission of Sensitive Information via HTTP',
        Threat: 'Medium',
        Details: "The host application transmits sensitive information (username, passwords) in cleartext via HTTP.",
      },
    ],
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.date}
        </TableCell>
        <TableCell align="center">{row.Vulnerabilities}</TableCell>
        <TableCell align="center">{row.IP}</TableCell>
        <TableCell align="center">{row.Solved}</TableCell>
        <TableCell align="center">{row.Notice}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Report
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>NVT</TableCell>
                    <TableCell>Details</TableCell>
                    <TableCell align="left">Severity</TableCell>
                    {/* <TableCell align="right">port</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.NVT}
                      </TableCell>
                      <TableCell>{historyRow.Details}</TableCell>
                      <TableCell align="left">{historyRow.Threat}</TableCell>
                      {/* <TableCell align="right">
                          {Math.round(historyRow.amount * row.price * 100) / 100}
                        </TableCell> */}
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

const rows = [
  createData('Tue Apr 26 06:30:00 2022 UTC', 12, "65.61.137.117", 10, 2, 1),
  createData('Wed Apr 27 06:30:00 2022 UTC', 23, "65.61.137.117", 22, 1, 0),
  createData('Thu Apr 28 06:30:00 2022 UTC', 26, "65.61.137.117", 26, 0, 0),
  createData('Fri Apr 29 06:30:00 2022 UTC', 30, "65.61.137.117", 30, 0, 1),
  createData('Sat Apr 30 06:30:00 2022 UTC', 35, "65.61.137.117", 34, 1, 2),
];



export default Report_table