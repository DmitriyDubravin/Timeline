const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {
    const login = req.body.login;
    const password = req.body.password;
    const findUserNameOptions = {name: login}

    const foundUser = await f.tryCatch(f.findUser(findUserNameOptions));
    if (foundUser.err) e.findUserNameError(res);

    if (f.isUserFound(foundUser.data) && f.isPasswordMatches(password, foundUser.data)) {

        const removedUser = await f.tryCatch(f.removeUser(findUserNameOptions));
        if (removedUser.err) e.removeUserError(res);

        res.send({
            message: "User were deleted!",
            status: 'success',
            data: {
                name: false
            }
        });

    } else {

        res.send({
            message: "Wrong password",
            status: 'error',
            data: {
                name: false
            }
        });

    }
}