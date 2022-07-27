const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Report = require('../schema/schema')
const app = express();

var coll = [], DataSend = []

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

            DataSend = [], Details = []
            for (item in coll) {
                var report = mongoose.model('report', Report, coll[item]);
                report.find({})
                    .then((data) => {
                        if (data.length !== 0) {
                            var Details = [], iter = 0
                            for (item in data) {
                                Details.push({
                                    Result_ID: data[item]['Result ID'], Impact: data[item].Impact,
                                    Summary: data[item].Summary, NVT_Name: data[item]['NVT Name'], Solution: data[item].Solution
                                })
                            }

                            DataSend.push({
                                Timestamp: data[iter].Timestamp, IP: data[iter].IP, Hostname: data[iter].Hostname,
                                NumberOfFound: data.length, Warning: 0, Details
                            })
                        }
                    })
            }
        })
    }

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

module.exports = router