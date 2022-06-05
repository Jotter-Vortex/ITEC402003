const express = require('express')
const cors = require('cors')
const connect = require('./schema')
const app = express();
const PORT = process.env.PORT || 5000;

connect();

// middlewares
app.use(express.json());
app.use(cors());

app.use("/all", require("./db/allCollections"));
app.use("/rvul", require("./db/vulnerability"));
app.use("/nve", require("./db/nve"));
app.use("/details", require("./db/details"));
app.use("/table", require("./db/table"));
app.use("/vtype", require("./db/vultypes"));
app.use("/high", require("./db/high"));
app.use("/user", require("./db/user"));
app.use("/auth", require("./db/auth"));

app.listen(PORT, console.log(`Listening on port ${PORT}...`));