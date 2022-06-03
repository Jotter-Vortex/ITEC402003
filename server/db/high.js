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
                    var high = 0
                    for (item in data) {
                        if (data[item].Severity === 'High') {
                            high++
                        }
                    }
                    
                    DataSend.push({time : data[item].Timestamp, num : high})
                })
        }

        //cors policy avoid
        router.get('/', (req, res) => {            
            function sortFunction(a, b) {
                if (a.time === b.time) {
                    return 0;
                }
    
                else {
                    return (a.time < b.time) ? -1 : 1;
                }
            }

            res.json(DataSend.sort(sortFunction))
    })

    console.log('Mongoose is connected!!!!');
})})

module.exports = router