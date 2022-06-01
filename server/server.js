const express = require('express');
const connect = require('./schema')
const app = express();
const PORT = process.env.PORT || 5000;

connect();

app.use("/all", require("./db/allCollections"));
app.use("/rvul", require("./db/vulnerability"));
app.use("/nve", require("./db/nve"));
app.use("/details", require("./db/details"));
app.use("/table", require("./db/table"));

app.listen(PORT, console.log(`Server is starting at ${PORT}`));