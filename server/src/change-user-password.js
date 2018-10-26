const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    const {login, password, newPassword} = req.body;

    const findUserNameOptions = {name: login}

    const foundUser = await f.tryCatch(f.findUser(findUserNameOptions));
    foundUser.err && e.findUserNameError(res);

    if (f.isUserFound(foundUser.data) && f.isPasswordMatches(password, foundUser.data)) {

        const updateUserPasswordOptions = {password: f.hashPassword(newPassword)};
        const updatedUser = await f.tryCatch(f.updateUser(findUserNameOptions, updateUserPasswordOptions))
        updatedUser.err && e.updateUserPasswordError(res);

        f.success(res);

    } else {

        f.failure(res);

    }
}