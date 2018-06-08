const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    const hash = req.params['0']; /// ???
    const findUserRoleOptions = {role: hash} // ???
    const updateUserRoleOptions = {role: 'user'}

    const foundUser = await f.tryCatch(f.findUser(findUserRoleOptions));
    if (foundUser.err) e.findUserRoleError(res);

    if (f.isUserFound(found.data)) {

        const updatedUser = await f.tryCatch(f.updateUser(findUserRoleOptions, updateUserRoleOptions));
        if (updatedUser.err) e.updateUserRoleError(res);

        res.send({
            message: "Email were successfully verified",
            status: 'success',
        });

    } else {

        res.send({
            message: "verification link is broken",
            status: 'error',
        });
    }

}