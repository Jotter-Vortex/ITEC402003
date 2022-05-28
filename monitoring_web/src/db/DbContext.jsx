import React from "react";
import axios from 'axios';
import { createContext, useEffect, useState } from 'react'

const dbContext = createContext();

export function DbProvider({ children }) {
  var rHigh = 0, rMiddle = 0, rLow = 0, rTotal = 0, tHigh = 0, tMiddle = 0, tLow = 0, tTotal = 0, nveArr = []
  const [report, setReport] = useState([])
  const [vul, setVul] = useState([])
  const [nve, setNve] = useState([])

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:5000/all');
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

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:5000/rvul');
        setVul(response.data)
      }
      catch (err) {
        if (err.response) {
          console.log('error')
        }
      }
    }

    fetchReports()
  }, [])

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:5000/nve');
        setNve(response.data)
      }
      catch (err) {
        if (err.response) {
          console.log('error')
        }
      }
    }

    fetchReports()
  }, [])

  if(nve.length !== 0) {
    nveArr = nve
  }

  if (vul.length !== 0) {
    rHigh = vul[0].rH
    rMiddle = vul[0].rM
    rLow = vul[0].rL
    rTotal = vul[0].rT
    tHigh = vul[0].tH
    tMiddle = vul[0].tM
    tLow = vul[0].tL
    tTotal = vul[0].tT
  }

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

  return (
    <dbContext.Provider value={{
      Content: arr,
      rHigh : rHigh,
      rMiddle : rMiddle,
      rLow : rLow,
      rTotal : rTotal,
      tHigh : tHigh,
      tMiddle : tMiddle,
      tLow : tLow,
      tTotal : tTotal,
      nveArray : nveArr
    }}>
      {children}
    </dbContext.Provider>
  )
}

export default dbContext