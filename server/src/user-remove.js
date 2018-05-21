const Users = require('./schemas/schema-user');

module.exports = function(req, res) {

    let user = {
        name: req.body.login,
        password: req.body.password
    }

    Users.remove(
        user,
        function(err) {
            if (err) {
                console.log(err);
            } else {
                res.send({
                    data: {
                        message: "User were deleted!",
                        status: 'success'
                    }
                });
            }
        }
    );
}