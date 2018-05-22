const bcrypt = require('bcryptjs');

module.exports = function(schema) {
    return function(req, res) {

        let isNameAlreadyTaken = {
            name: req.body.login
        }

        schema.find(isNameAlreadyTaken, function(err, resp) {
            if (err) {
                console.log(err);
            } else {
                if (resp.length === 0) {

                    var salt = bcrypt.genSaltSync(10);
                    var hashedPassword = bcrypt.hashSync(req.body.password, salt);

                    let addingData = {
                        name: req.body.login,
                        password: hashedPassword,
                        email: req.body.email
                    };

                    let newUser = new schema(addingData);
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
}