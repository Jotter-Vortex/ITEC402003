const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const csvtojson = require('csvtojson');
const mongodb = require('mongodb')

const app = express();
const PORT = process.env.PORT || 5000;
const ID = 'Report'
const PW = 'report'
const MONGODB_URI = 'mongodb+srv://' + ID + ':' + PW + '@cluster0.2nwmd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const fs = require('fs');
const csv = require('csvtojson')

//mongodb connection
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!');
});

//file read
const dir = __dirname + '\\files'
const files = fs.readdirSync(dir)

//schema 자료형 구조
const Report = new mongoose.Schema({
    IP: String,
    Hostname: String,
    Port: Number,
    'Port Protocol': String,
    CVSS: String,
    Severity: String,
    'Solution Type': String,
    'NVT Name': String,
    Summary: String,
    'Specific Result': String,
    'NVT OID': String,
    CVEs: String,
    'Task ID': String,
    'Task Name': String,
    Timestamp: String,
    'Result ID': String,
    Impact: String,
    Solution: String,
    'Affected Software/OS': String,
    'Vulnerability Insight': String,
    'Vulnerability Detection Method': String,
    'Product Detection Result': String,
    BIDs: String,
    CERTs: String,
    'Other References': String
});

const DataSend = []

//dir files 폴더 내의 파일들을 읽어서 db의 schema 생성
//file의 이름을 가진 schema를 Report 모델에 생성
//file 이름 기준 중복 방지

for (const file of files) {
    const fp = dir + '\\' + file
    const name = file.split('.')
    
    csv()
        .fromFile(fp)
        .then((jsonObj) => {
            const time = jsonObj[0].Timestamp
            const reportModel = mongoose.model(time, Report);
            reportModel.find({})
                .then((data) => {
                    for (item in jsonObj) {
                        DataSend.push({
                            IP: jsonObj[item].IP,
                            Hostname: jsonObj[item].Hostname,
                            Port: jsonObj[item].Port,
                            Port_Protocol: jsonObj[item]['Port Protocol'],
                            CVSS: jsonObj[item].CVSS,
                            Severity: jsonObj[item].Severity,
                            Solution_Type: jsonObj[item]['Solution Type'],
                            NVT_Name: jsonObj[item]['NVT Name'],
                            Summary: jsonObj[item].Summary,
                            Specific_Result: jsonObj[item]['Specific Result'],
                            NVT_OID: jsonObj[item]['NVT OID'],
                            CVEs: jsonObj[item].CVEs,
                            Task_ID: jsonObj[item]['Task ID'],
                            Task_Name: jsonObj[item]['Task Name'],
                            Timestamp: jsonObj[item].Timestamp,
                            Result_ID: jsonObj[item]['Result ID'],
                            Impact: jsonObj[item].Impact,
                            Solution: jsonObj[item].Solution,
                            Affected_Software_OS: jsonObj[item]['Affected Software/OS'],
                            Vulnerability_Insight: jsonObj[item]['Vulnerability Insight'],
                            Vulnerability_Detection_Method: jsonObj[item]['Vulnerability Detection Method'],
                            Product_Detection_Result: jsonObj[item]['Product Detection Result'],
                            BIDs: jsonObj[item].BIDs,
                            CERTs: jsonObj[item].CERTs,
                            Other_References: jsonObj[item]['Other References'],
                            Len: jsonObj.length,
                            File: files.length
                        });
                    }

                    if (data == undefined || data.length == 0) {
                        console.log('inserting data')
                        for (item in jsonObj) {
                            console.log(jsonObj[item])
                            new reportModel(jsonObj[item])
                                .save()
                                .catch((err) => {
                                    console.log(err.message);
                                });
                        }
                    }

                    else {
                        console.log('already exisiting')
                    }
                })
        })
}

//cors policy avoid
for (const file of files) {
    app.get('/api', (req, res) => {
        res.setHeader('Access-Control-Allow-origin', '*');
        res.json(DataSend)
    })
}

app.listen(PORT, console.log(`Server is starting at ${PORT}`));