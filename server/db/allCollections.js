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
                    DataSend.push(data)
                })
        }
        
        //cors policy avoid
        router.get('/', (req, res) => {
            console.log('sent')
            res.setHeader('Access-Control-Allow-origin', '*');
            res.json(DataSend)
        })
    })

    console.log('Mongoose is connected!!!!');
})

module.exports = router