const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/timeline');
let db = mongoose.connection;

const userRegister = require('./user-register');
const userLogin = require('./user-login');
const userRemove = require('./user-remove');
const userChangePassword = require('./user-change-password');



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

app.post('/', (req, res) => {
    res.send({
        message: req.body.txt
    })
});

app.post('/user-register', userRegister);
app.post('/user-login', userLogin);
app.post('/user-change-password', userChangePassword);
app.post('/user-remove', userRemove, (req, res) => {
    res.redirect('/')
});



app.listen(process.env.PORT || 8081);
