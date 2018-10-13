const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {
    console.log(1);

    const {login, password} = req.body;
    const findUserNameOptions = {name: login}

    const foundUser = await f.tryCatch(f.findUser(findUserNameOptions));
    foundUser.err && e.findUserNameOptions(res);

    if (f.isUserFound(foundUser.data) && f.isPasswordMatches(password, foundUser.data)) {

        if (f.isUserEmailConfirmed(foundUser.data[0])) {

            const token = f.generateToken(login + password);
            const updateUserTokenOptions = {token: token}

            const updatedUser = await f.tryCatch(f.updateUser(findUserNameOptions, updateUserTokenOptions));
            updatedUser.err && e.updateUserTokenError(res);

            f.success(res, {
                name: login,
                token: token
            });

        } else {

            f.failure(res, {
                cause: 'email'
            });

        }

    } else {

        f.failure(res);

    }
}
