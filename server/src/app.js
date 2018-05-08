const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/timeline');
let db = mongoose.connection;

// users Schema
let usersSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

let Users = mongoose.model('Users', usersSchema);

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
        message: req.body.txt + '!!'
    })
});

app.post('/register', (req, res) => {

    let addingData = {
        name: req.body.login,
        password: req.body.password
    };

    Users.find(addingData, function(err, resp) {
        if (err) {
            console.log(err);
        } else {
            if (resp.length === 0) {
                let newUser = new Users(addingData);
                newUser.save(function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send({
                            message: "New user was added!"
                        });
                    }
                });
            } else {
                res.send({
                    message: "This user already exists!"
                })
            }
        }
    });
});

app.post('/login', (req, res) => {
    Users.find({}, function(err, resp) {
        if(err) {
            console.log(err);
        } else {
            res.send({
                message: resp
            })
        }
    });
});


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

app.post('/user-remove', (req, res) => {

    Users.remove(
        {name: req.body.login},
        function(err) {
            if (err) {
                console.log(err);
            } else {
                res.send({
                    message: "User was deleted!"
                });
            }
        }
    );
});


app.post('/user-change-password', (req, res) => {

    let login = req.body.login;
    let currentPassword = req.body.currentPassword;
    let newPassword = req.body.newPassword;
    let query = {name: login, password: currentPassword};
    let data = {name: login, password: newPassword};

    console.log(query)
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
                                    message: "Password were changed!"
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
