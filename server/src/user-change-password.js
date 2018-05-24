const f = require('./support/functions');

module.exports = async function(req, res) {

    const login = req.body.login;
    const password = req.body.currentPassword;
    const newPassword = req.body.newPassword;

    const user = {name: login};
    const update = {password: f.hashPassword(newPassword)};

    const found = await f.to(f.findUser(user));
    if (found.err) res.status(500).send({message: '\nServer error while searching for user name\n\n'});

    if (f.isUserFound(found.data) && f.isPasswordMatches(password, found.data)) {

        const updated = await f.to(f.updateUser(user, update))
        if (updated.err) res.status(500).send({message: '\nServer error while updating user password\n\n'});

        res.send({
            message: "Password were changed!",
            status: 'success'
        });

    } else {

        res.send({
            message: "Wrong current password!",
            status: 'error'
        });

    }
}