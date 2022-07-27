const mongoose = require("mongoose");

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

module.exports = Report