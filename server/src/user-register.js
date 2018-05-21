const Users = require('./schemas/schema-user');

module.exports = function(req, res) {

    let isNameAlreadyTaken = {
        name: req.body.login
    }

    let addingData = {
        name: req.body.login,
        password: req.body.password,
        email: req.body.email
    };

    Users.find(isNameAlreadyTaken, function(err, resp) {
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
                            data: {
                                message: "New user was added!",
                                status: 'success'
                            }
                        });
                    }
                });
            } else {
                res.send({
                    data: {
                        message: "This username already taken!",
                        status: 'error'
                    }
                });
            }
        }
    });
}