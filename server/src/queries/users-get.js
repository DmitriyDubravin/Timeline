const s = require('./../support/support');
const f = require('./../support/functions');
const e = require('./../support/errors');

module.exports = async function(req, res) {

    console.log('\n\n\nUSERS GET\n\n\n');

    const findUsersOptions = {}

    // const {data, err} = await f.tryCatch(f.findUsers(findUsersOptions));
    // err && e.findUsersError(res);

    // const usersList = data.map(user => {
    //     return {
    //         _id: user._id,
    //         name: user.name
    //     }
    // });
    // f.success(res, {usersList: usersList});

    const usersFound = s.composePromise(
        s.setStatus(200)
    );
    const usersNotFound = s.composePromise(
        s.setError,
        s.setStatus(500),
        s.setData('error while searching users'),
    );
    const checkUsersFound = onSuccess => onError => shell => {
        if (shell.error) return onError(shell);
        return onSuccess(shell);
    }

    return await s.composePromise(
        s.sendResponse,
        checkUsersFound(usersFound)(usersNotFound),
        f.usersFind(findUsersOptions),
        s.createShell
    )(res);

}