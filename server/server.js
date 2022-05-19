const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const csvtojson = require('csvtojson');
const mongodb = require('mongodb')
const fs = require('fs');
const csv = require('csvtojson')

const app = express();
const PORT = process.env.PORT || 5000;
const ID = 'Report'
const PW = 'report'
const MONGODB_URI = 'mongodb+srv://' + ID + ':' + PW + '@cluster0.2nwmd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const dir = __dirname + '\\files'
const files = fs.readdirSync(dir)

var coll = [], DataSend = []

//mongodb connection
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    mongoose.connection.db.listCollections().toArray(function(err, names) {
        if (err) {
            console.log(err);
        }
        else {
            names.forEach(function(e,i,a) {
                coll.push(e.name)
            });
        }
    });
    console.log('Mongoose is connected!!!!');
});

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
                    if (data == undefined || data.length == 0) {
                        console.log('inserting data')
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

var i = 0
//cors policy avoid
app.get('/api', (req, res) => {
    for (item in coll) {
        const dbReport = mongoose.model(coll[item], Report)

        if (i === 0) {
            dbReport.find({})
                .then((data) => {
                    DataSend.push(data)
                    i += data.length
                })
        }
    }

    if (i != 0) {
        console.log('sent')
        res.setHeader('Access-Control-Allow-origin', '*');
        res.json(DataSend)
    }
})

app.listen(PORT, console.log(`Server is starting at ${PORT}`));