const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    const login = req.body.login;
    const password = req.body.currentPassword;
    const newPassword = req.body.newPassword;

    const findUserNameOptions = {name: login}
    const updateUserPasswordOptions = {password: f.hashPassword(newPassword)};

    const foundUser = await f.tryCatch(f.findUser(findUserNameOptions));
    if (foundUser.err) e.findUserNameError(res);

    if (f.isUserFound(foundUser.data) && f.isPasswordMatches(password, foundUser.data)) {

        const updated = await f.tryCatch(f.updateUser(findUserNameOptions, updateUserPasswordOptions))
        if (updated.err) e.updateUserPasswordError(res);

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