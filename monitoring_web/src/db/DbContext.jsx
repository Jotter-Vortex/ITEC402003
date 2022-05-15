import React from "react";
import axios from 'axios';
import { createContext, useEffect, useState } from 'react'

const dbContext = createContext();

export function DbProvider({ children }) {
  const [report, setReport] = useState([])

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api');
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

  var high = 0, middle = 0, low = 0;

  for(var i = 0; i < report.length; i++) {
    if(report[i].Severity == 'High') {
      high++
    }

    else if(report[i].Severity == 'Medium') {
      middle++
    }

    else {
      low++
    }
  }
  
  return (
    <dbContext.Provider value={{
      IP: report.IP,
      Hostname: report.Hostname,
      Port: report.Port,
      // 'Port Protocol': String,
      CVSS: report.CVSS,
      Severity: report.Severity,
      // 'Solution Type': report('Port Protocol'),
      // 'NVT Name': String,
      Summary: report.Summary,
      // 'Specific Result': String,
      // 'NVT OID': String,
      CVEs: report.CVEs,
      // 'Task ID': String,
      // 'Task Name': String,
      Timestamp: report.Timestamp,
      // 'Result ID': String,
      Impact: report.Impact,
      Solution: report.Solution,
      // 'Affected Software/OS': String,
      // 'Vulnerability Insight': String,
      // 'Vulnerability Detection Method': String,
      // 'Product Detection Result': String,
      BIDs: report.BIDs,
      CERTs: report.CERTs,
      // 'Other References': report,
      High: high,
      Middle: middle,
      Low: low
    }}>
      {children}
    </dbContext.Provider>
  )
}

export default dbContext