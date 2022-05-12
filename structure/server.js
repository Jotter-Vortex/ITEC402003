const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080; // Step 1
const MONGODB_URI = 'mongodb+srv://Report:report@cluster0.2nwmd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
//const routes = require('./routes/api');

const Schema = mongoose.Schema;
const reporting = new Schema({}, 
  { collection : 'reporting' }); 

const newReport = mongoose.model('reporting', reporting);

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected!!!!');
});

app.get('/api', (req, res) => {  
  res.setHeader('Access-Control-Allow-origin', '*');

  newReport.find({})
    .then((data) => {
      console.log('Data: ', data);
      res.json(data);
    })

    .catch((error) => {
      console.log('error: ', daerrorta);
    })
});

newReport.find({}, function (err, doc) {
  console.log((doc))
})

app.listen(PORT, console.log(`Server is starting at ${PORT}`));