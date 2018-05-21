const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/timeline');
let db = mongoose.connection;


const Users = require('./schemas/schema-user');
const userRegister = require('./user-register');
const userLogin = require('./user-login');
const userRemove = require('./user-remove');



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


app.post('/user-edit', (req, res) => {

    let data = {
        name: req.body.login,
        password: req.body.password
    };

    Users.update(
        {name: 'test2'},
        data,
        function(err) {
            if (err) {
                console.log(err);
            } else {
                res.send({
                    message: "New user was added!"
                });
            }
        }
    );

});

app.post('/user-remove', userRemove);

app.post('/user-change-password', (req, res) => {

    let login = req.body.login;
    let currentPassword = req.body.currentPassword;
    let newPassword = req.body.newPassword;
    let query = {name: login, password: currentPassword};
    let data = {name: login, password: newPassword};

    Users.find(query, (err, resp) => {
        if (err) {
            console.log(err);
        } else {
            if (resp.length !== 0) {
                Users.update(
                    query,
                    data,
                    function(err) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.send({
                                data: {
                                    message: "Password were changed!",
                                    status: 'success'
                                }
                            });
                        }
                    }
                );
            } else {
                res.send({
                    data: {
                        message: "Wrong current password!",
                        status: 'error'
                    }
                });
            }
        }
    })
});


app.listen(process.env.PORT || 8081);
