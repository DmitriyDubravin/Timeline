const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    const hash = req.body.hash;

    const findUserRoleOptions = {role: hash}

    const foundUser = await f.tryCatch(f.findUser(findUserRoleOptions));
    foundUser.err && e.findUserRoleError(res);

    if (f.isUserFound(foundUser.data)) {

        const updatedUser = await f.tryCatch(f.updateUser(findUserRoleOptions, {role: 'user'}));
        updatedUser.err && e.updateUserRoleError(res);

        f.success(res);

    } else {

        f.failure(res);

    }

}