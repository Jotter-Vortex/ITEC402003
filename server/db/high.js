const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Report = require('../schema/schema')
const app = express();

var coll = [], DataSend = [], blank = []

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

            DataSend = []
            for (item in coll) {
                var report = mongoose.model('report', Report, coll[item]);
                report.find({})
                    .then((data) => {
                        if (data.length !== 0) {
                            var high = 0
                            for (item in data) {
                                if (data[item].Severity === 'Medium') {
                                    high++
                                }
                            }

                            DataSend.push({ time: data[item].Timestamp, num: high })
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