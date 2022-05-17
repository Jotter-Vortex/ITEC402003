const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const csvtojson = require('csvtojson');
const mongodb = require('mongodb')

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = 'mongodb+srv://Report:report@cluster0.2nwmd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
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
console.log(files.length)
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

const DataSend = [[
    {
        IP: String,
        Hostname: String,
        Port: Number,
        Port_Protocol: String,
        CVSS: String,
        Severity: String,
        Solution_Type: String,
        NVT_Name: String,
        Summary: String,
        Specific_Result: String,
        NVT_OID: String,
        CVEs: String,
        Task_ID: String,
        Task_Name: String,
        Timestamp: String,
        Result_ID: String,
        Impact: String,
        Solution: String,
        Affected_Software_OS: String,
        Vulnerability_Insight: String,
        Vulnerability_Detection_Method: String,
        Product_Detection_Result: String,
        BIDs: String,
        CERTs: String,
        Other_References: String
    }
]]


//dir files 폴더 내의 파일들을 읽어서 db의 schema 생성
//file의 이름을 가진 schema를 Report 모델에 생성
//file 이름 기준 중복 방지

for (const file of files) {
    var i = 0
    const fp = dir + '\\' + file
    const name = file.split('.')

    const reportModel = mongoose.model(name[0], Report);
    csv()
        .fromFile(fp)
        .then((jsonObj) => {
            reportModel.find({})
                .then((data) => {
                    for (item in jsonObj) {

                    }

                    if (data == undefined || data.length == 0) {
                        console.log('inserting data')
                        console.log(item in jsonObj)
                        for (item in jsonObj) {
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
        const fp = dir + '\\' + file
        const name = file.split('.')
        const reportModel = mongoose.model(name[0], Report);

        reportModel.find({})
            .then((data) => {
                res.json(data)
            })

            .catch((error) => {
                console.log('error');
            })
    })
}

app.listen(PORT, console.log(`Server is starting at ${PORT}`));