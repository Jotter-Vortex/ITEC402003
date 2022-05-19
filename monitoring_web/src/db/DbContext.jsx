import React from "react";
import axios from 'axios';
import { createContext, useEffect, useState } from 'react'

const dbContext = createContext();

export function DbProvider({ children }) {
  const [report, setReport] = useState([])

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api');
        setReport(response.data)
      }
      catch (err) {
        if (err.response) {
          console.log('error')
        }
      }
    }

    fetchReports()
  }, [])

  var arr = [], dbList = []
  var fileLen = 0, prev = 0

  for (let key in report) {
    if (report.length != 0) {
      report[key]["key"] = key;
      arr.push(report[key]);
    }
  }

  if (arr.length != 0) {
    fileLen = arr[0].File
  }

  if (arr.length != 0) {
    arr.sort(sortFunction);

    function sortFunction(a, b) {
      if (a[0].Timestamp === b[0].Timestamp) {
        return 0;
      }

      else {
        return (a[0].Timestamp < b[0].Timestamp) ? -1 : 1;
      }
    }
  }

  console.log(arr)
  
  var high = 0, middle = 0, low = 0, i = 0


  console.log(dbList)

  if (dbList.length !== 0) {
    if (dbList[i].Severity === 'High') {
      high++
    }

    else if (dbList[i].Severity === 'Medium') {
      middle++
    }

    else {
      low++
    }
  }

  return (
    <dbContext.Provider value={{
      Content: dbList,
      High: high,
      Middle: middle,
      Low: low
      // IP: report.IP,
      // Hostname: report.Hostname,
      // Port: report.Port,
      // Port_Protocol: report.Port_Protocol,
      // CVSS: report.CVSS,
      // Severity: report.Severity,
      // Solution_Type: report.Solution_Type,
      // NVT_Name: report.NVT_Name,
      // Summary: report.Summary,
      // Specific_Result: report.Specific_Result,
      // NVT_OID: report.NVT_OID,
      // CVEs: report.CVEs,
      // Task_ID: report.Task_ID,
      // Task_Name: report.Task_Name,
      // Timestamp: report.Timestamp,
      // Result_ID: report.Result_ID,
      // Impact: report.Impact,
      // Solution: report.Solution,
      // Affected_Software_OS: report.Affected_Software_OS,
      // Vulnerability_Insight: report.Vulnerability_Insight,
      // Vulnerability_Detection_Method: report.Vulnerability_Detection_Method,
      // Product_Detection_Result: report.Product_Detection_Result,
      // BIDs: report.BIDs,
      // CERTs: report.CERTs,
      // Other_References: report.Other_References,
    }}>
      {children}
    </dbContext.Provider>
  )
}

export default dbContext