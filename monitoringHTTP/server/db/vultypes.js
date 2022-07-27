const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Report = require('../schema/schema')
const app = express();

var Details = [], blank = [], coll = []

//cors policy avoid
router.get('/', (req, res) => {
    if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
        mongoose.connection.db.listCollections().toArray(function (err, names) {
            coll = []
            if (coll.length === 0) {
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
            }

            coll.sort(sortFunction);

            Details = []
            var report = mongoose.model('report', Report, coll[coll.length - 1]);
            report.find((error, data) => {
                if (data.length !== 0) {
                    if (error) {
                        console.log(error)
                    }

                    else {
                        for (item in data) {
                            Details.push({ name: data[item]['NVT Name'] })
                        }
                    }
                }
            })
        })
    }

    res.json(Details)
})

module.exports = router