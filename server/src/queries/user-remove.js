const s = require('./../support/support');
const db = require('./../support/functions');
const e = require('./../support/errors');

module.exports = async function(req, res) {

    const {login, password} = req.body;
    const findUserNameOptions = {
        name: login
    };

    const userFound = s.composePromise(
        s.setStatus(200)
    );
    const userNotFound = s.composePromise(
        s.setError,
        s.setStatus(500),
        s.setData('user not found'),
    );
    const checkUserFound = onSuccess => onError => shell => {
        if (shell.error) return shell;
        if (shell.data.length) return onSuccess(shell);
        return onError(shell);
    }

    const passwordIsWrong = s.composePromise(
        s.setError,
        s.setStatus(500),
        s.setData(e.userPasswordError),
    );
    const checkUserPassword = onError => shell => {
        if (shell.error) return shell;
        if (!db.isPasswordMatches(password, shell.data[0].password)) {
            return onError(shell);
        }
        return shell;
    }


    return await s.composePromise(
        s.sendResponse,
        db.userRemove(findUserNameOptions),
        checkUserPassword(passwordIsWrong),
        checkUserFound(userFound)(userNotFound),
        db.userFind(findUserNameOptions),
        s.createShell
    )(res);

}