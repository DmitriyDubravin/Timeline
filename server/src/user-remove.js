const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    const {login, password} = req.body;
    const findUserNameOptions = {name: login}

    const foundUser = await f.tryCatch(f.findUser(findUserNameOptions));
    foundUser.err && e.findUserNameError(res);

    if (f.isUserFound(foundUser.data) && f.isPasswordMatches(password, foundUser.data)) {

        const removedUser = await f.tryCatch(f.removeUser(findUserNameOptions));
        removedUser.err && e.removeUserError(res);

        f.success(res);

    } else {

        f.failure(res);

    }
}