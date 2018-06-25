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
const tokenAcknowledge = require('./token-acknowledge');
const usersList = require('./users-list');
const getEventsList = require('./get-events-list');
const emailConfirmation = require('./email-confirmation');
const userData = require('./user-data');
const getTypes = require('./get-types');
const getCategories = require('./get-categories');
const getSubcategories = require('./get-subcategories');
const addEvent = require('./add-event');


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
app.post('/user-remove', userRemove);
app.post('/token-acknowledge', tokenAcknowledge);
app.post('/users-list', usersList);

app.post('/email-confirmation', emailConfirmation);

app.post('/user-get-data', userData);

app.post('/get-events-list', getEventsList);

app.post('/get-types', getTypes);
app.post('/get-categories', getCategories);
app.post('/get-subcategories', getSubcategories);

app.post('/add-event', addEvent);

app.listen(process.env.PORT || 8081);
