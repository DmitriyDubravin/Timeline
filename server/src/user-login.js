const Users = require('./schemas/schema-user');

module.exports = function(req, res) {
    const user = {
        name: req.body.login,
        password: req.body.password
    }
    Users.find(user, function(err, resp) {
        if(err) {
            console.log(err);
        } else {
            if (resp.length === 0) {
                res.send({
                    data: {
                        message: "Wrong login / password",
                        status: 'error',
                        data: {
                            name: 'guest'
                        }
                    }
                });
            } else {
                res.send({
                    data: {
                        message: "You've been logged in",
                        status: 'success',
                        data: {
                            name: resp[0].name
                        }
                    }
                });
            }
        }
    });
}
