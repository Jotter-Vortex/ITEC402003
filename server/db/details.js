const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Report = require('../schema/schema')
const app = express();

var coll = [], DataSend = []

mongoose.connection.on('connected', () => {
    mongoose.connection.db.listCollections().toArray(function (err, names) {
        if (err) {
            console.log(err);
        }

        else {
            names.forEach(function (e, i, a) {
                coll.push(e.name)
            })
        }

        function sortFunction(a, b) {
            if (a === b) {
                return 0;
            }

            else {
                return (a < b) ? -1 : 1;
            }
        }

        coll.sort(sortFunction);

        for (item in coll) {
            const dbReport = mongoose.model(coll[item], Report)
            dbReport.find({})
                .then((data) => {                                    
                    var Details = [], iter = 0
                    for(item in data) {
                        Details.push({ Result_ID : data[item]['Result ID'], Impact : data[item].Impact, 
                        Summary : data[item].Summary, NVT_Name : data[item]['NVT Name'], Solution : data[item].Solution})
                    }

                    DataSend.push({Timestamp : data[iter].Timestamp, IP : data[iter].IP, Hostname : data[iter].Hostname, 
                        NumberOfFound : data.length, Warning : 0, Details})
                })
        }

        //cors policy avoid
        router.get('/', (req, res) => {
            console.log('sent')
            res.setHeader('Access-Control-Allow-origin', '*');
            function sortFunction(a, b) {
                if (a.Timestamp === b.Timestamp) {
                    return 0;
                }

                else {
                    return (a.Timestamp < b.Timestamp) ? -1 : 1;
                }
            }

            res.json(DataSend.sort(sortFunction))
        })
    })

    console.log('Mongoose is connected!!!!');
})

module.exports = router