const mongoose = require("mongoose");
const express = require('express');
const fs = require('fs');
const csv = require('csvtojson')
const path = require('path');
const router = express.Router();
const Report = require('./schema')
const app = express();
// const jwt = require("jsonwebtoken");
// const Joi = require("joi");
// const passwordComplexity = require("joi-password-complexity");

const ID = 'Report'
const PW = 'report'
const MONGODB_URI = 'mongodb+srv://' + ID + ':' + PW + '@cluster0.2nwmd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const dir = path.join(__dirname, '..\\') + '\\files'
const files = fs.readdirSync(dir)

module.exports = () => {
  const connect = () => {
    //mongodb connection
    mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }

  connect();

  mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!')
  })

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
}
