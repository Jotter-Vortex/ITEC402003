const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const csvtojson = require('csvtojson');
const mongodb = require('mongodb')

const app = express();
const PORT = process.env.PORT || 8080;
const MONGODB_URI = 'mongodb+srv://Report:report@cluster0.2nwmd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const fs = require('fs');
const { PermScanWifiOutlined } = require('@mui/icons-material');


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
const Schema = mongoose.Schema;

//dir files 폴더 내의 파일들을 읽어서 db의 schema 생성
//file의 이름을 가진 schema를 Report 모델에 생성

for (const file of files) {
  const fp = dir + '\\' + file
  const name = file.split('.')

  //schema 자료형 구조
  const Report = mongoose.model(name[0], Schema({
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
  }));

  const csv = require('csvtojson')

  const Pfile = 0

  //검사 시간 기준으로 데이터 중복 확인 및 삽입
  csv()
    .fromFile(fp)
    .then((jsonObj) => {
      for (item in jsonObj) {

        Report.find({})
          .then((data) => {
            if (data == undefined || data.length == 0 || data[0].Timestamp != jsonObj[item].Timestamp) {
              console.log('inserting data')
              new Report(jsonObj[item])
                .save()
                .catch((err) => {
                  console.log(err.message);
                });
            }

            else {
              console.log('already exisiting')
            }
          })  
      }
    })

  //   //cors policy avoid
  //   app.get('/api', (req, res) => {
  //     res.setHeader('Access-Control-Allow-origin', '*');

  //     newReport.find({})
  //       .then((data) => {
  //         console.log('Data: ', data);
  //         res.json(data);
  //       })

  //       .catch((error) => {
  //         console.log('error: ', daerrorta);
  //       })
  //   });

}

app.listen(PORT, console.log(`Server is starting at ${PORT}`));