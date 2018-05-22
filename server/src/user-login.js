const bcrypt = require('bcryptjs');

module.exports = function(schema) {
    return function(req, res) {

        const user = {
            name: req.body.login
        }

        schema.find(user, function(err, resp) {
            if(err) {
                console.log(err);
            } else {
                if (
                    resp.length > 0 &&
                    bcrypt.compareSync(req.body.password, resp[0].password)
                ) {

                    // GENERATE TOKEN HERE
                    var salt = bcrypt.genSaltSync(10);
                    var token = bcrypt.hashSync(req.body.login + req.body.password, salt);

                    schema.update(user, {token: token}, function(err, numAffected) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(numAffected, token);
                            res.send({
                                data: {
                                    message: "You've been logged in",
                                    status: 'success',
                                    data: {
                                        name: resp[0].name,
                                        token: token
                                    }
                                }
                            });
                        }
                    });
                } else {
                    res.send({
                        data: {
                            message: "Wrong login / password",
                            status: 'error',
                            data: {
                                name: 'guest'
                            }
                        }
                    });
                }
            }
        });
    }
}
