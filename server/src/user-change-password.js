
module.exports = function(schema) {
    return function(req, res) {

        let login = req.body.login;
        let currentPassword = req.body.currentPassword;
        let newPassword = req.body.newPassword;
        let query = {name: login, password: currentPassword};
        let data = {name: login, password: newPassword};

        schema.find(query, (err, resp) => {
            if (err) {
                console.log(err);
            } else {
                if (resp.length !== 0) {
                    schema.update(
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
    }
}