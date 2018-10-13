// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const morgan = require('morgan');
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/timeline');
// let db = mongoose.connection;

// const userRegister = require('./user-register');
// const userLogin = require('./user-login');
// const userRemove = require('./user-remove');
// const userChangePassword = require('./user-change-password');
// const tokenAcknowledge = require('./token-acknowledge');
// const getUsersList = require('./get-users-list');
// const getEventsList = require('./get-events-list');
// const getEvent = require('./get-event');
// const emailConfirmation = require('./email-confirmation');
// const getUserData = require('./get-user-data');
// const getTypes = require('./get-types');
// const getCategories = require('./get-categories');
// const getSubcategories = require('./get-subcategories');
// const addEvent = require('./add-event');
// const editEvent = require('./edit-event');
// const removeEvent = require('./remove-event');
// const search = require('./search');


// // check connection
// db.once('open', function(err) {
//     console.log('Connected to MongoDB');
// });
// // check for db errors
// db.on('error', function(err) {
//     console.log(err)
// });

// const app = express();

// app.use(morgan('combined'));
// app.use(bodyParser.json());
// app.use(cors());

// app.post('/', (req, res) => {
//     res.send({
//         message: req.body.txt
//     })
// });

// app.post('/user-register', userRegister);
// app.post('/user-login', userLogin);
// app.post('/user-change-password', userChangePassword);
// app.post('/user-remove', userRemove);
// app.post('/token-acknowledge', tokenAcknowledge);
// app.post('/get-users-list', getUsersList);

// app.post('/email-confirmation', emailConfirmation);

// app.post('/get-user-data', getUserData);

// app.post('/get-events-list', getEventsList);
// app.post('/get-event', getEvent);

// app.post('/get-types', getTypes);
// app.post('/get-categories', getCategories);
// app.post('/get-subcategories', getSubcategories);

// app.post('/add-event', addEvent);
// app.post('/edit-event', editEvent);
// app.post('/remove-event', removeEvent);

// app.post('/search', search);

// app.listen(process.env.PORT || 8081);















// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const morgan = require('morgan');
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/timeline');
// let db = mongoose.connection;
// const paths = require('./support/paths');


// // check connection
// db.once('open', function(err) {
//     console.log('Connected to MongoDB');
// });
// // check for db errors
// db.on('error', function(err) {
//     console.log(err)
// });

// const app = express();

// app.use(morgan('combined'));
// app.use(bodyParser.json());
// app.use(cors());

// app.post('/', (req, res) => {
//     res.send({
//         message: req.body.txt
//     })
// });


// for (var path in paths) {
//     // console.log(paths[path]);
//     let s = paths[path].slice(1);
//     console.log(s);
//     app.post(s, require(paths[path]));
// }

// app.listen(process.env.PORT || 8081);