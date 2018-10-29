const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const paths = require('./support/paths');
mongoose.connect('mongodb://localhost/timeline');
let db = mongoose.connection;

// check connection
db.once('open', function(err) {
    console.log('Connected to MongoDB');
});
// check for db errors
db.on('error', function(err) {
    console.log(err)
});

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

for (var key in paths) {
    let path = paths[key];
    let file = '.' + path;
    app.post(path, require(file));
}

app.listen(process.env.PORT || 8081);