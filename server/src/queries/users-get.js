const s = require('./../support/support');
const f = require('./../support/functions');
const e = require('./../support/errors');

module.exports = async function(req, res) {

    console.log('\n\n\nUSERS GET\n\n\n');

    const findUsersOptions = {}

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