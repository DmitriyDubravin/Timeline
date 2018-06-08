const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    const login = req.body.login;
    const password = req.body.password;
    const findUserNameOptions = {name: login}

    const foundUser = await f.tryCatch(f.findUser(findUserNameOptions));
    if (foundUser.err) e.findUserNameOptions(res);

    if (f.isUserFound(foundUser.data) && f.isPasswordMatches(password, foundUser.data)) {

        const token = f.generateToken(login + password);
        const updateUserTokenOptions = {token: token}

        const updatedUser = await f.tryCatch(f.updateUser(findUserNameOptions, updateUserTokenOptions));
        if (updatedUser.err) e.updateUserTokenError(res);

        res.send({
            message: "You've been logged in",
            status: 'success',
            data: {
                name: found.data[0].name,
                token: token
            }
        });

    } else {

        res.send({
            message: "Wrong login / password",
            status: 'error',
            data: {
                name: false
            }
        });
    }
}
