
module.exports = function(schema) {
    return function(req, res) {
        
        let user = {
            name: req.body.login,
            password: req.body.password
        }

        schema.remove(
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
}