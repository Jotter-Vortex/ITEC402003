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

        var Details = []
        const dbReport = mongoose.model(coll[item], Report)
        dbReport.find({})
            .then((data) => {            
                for (item in data) {
                    Details.push({ name: data[item]['NVT Name'] })
                }
            })

        //cors policy avoid
        router.get('/', (req, res) => {
            res.setHeader('Access-Control-Allow-origin', '*');
            res.json(Details)
        })
    })

    console.log('Mongoose is connected!!!!');
})

module.exports = router