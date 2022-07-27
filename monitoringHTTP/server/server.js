const express = require('express')
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 5000;
const user = require('./db/user')
const auth = require('./db/auth');

// middlewares
app.use(express.json());
app.use(cors());

app.use("/user", user);
app.use("/auth", auth);

app.use("/rvul", require("./db/vulnerability"));
app.use("/nve", require("./db/nve"));
app.use("/details", require("./db/details"));
app.use("/table", require("./db/table"));
app.use("/vtype", require("./db/vultypes"));
app.use("/high", require("./db/high"));

app.listen(PORT, console.log(`Listening on port ${PORT}...`));