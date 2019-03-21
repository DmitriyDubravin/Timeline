const s = require('./../support/support');
const f = require('./../support/functions');
const e = require('./../support/errors');

module.exports = async function(req, res) {

    console.log('\n\nUSER LOGIN\n\n');

    const {login, password} = req.body;
    const token = f.generateToken(login + password);
    const userFindOptions = {name: login}
    const userUpdateOptions = {token: token}

    const userFound = s.composePromise(
        s.setStatus(200)
    );
    const userNotFound = s.composePromise(
        s.setError,
        s.setStatus(500),
        s.setData(e.findUserNameError),
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
        if (!f.isPasswordMatches(password, shell.data[0].password)) {
            return onError(shell);
        }
        return shell;
    }

    const emailIsNotConfirmed = s.composePromise(
        s.setError,
        s.setStatus(500),
        s.setData(e.userEmailError),
    );
    const checkEmailConfirmed = onError => shell => {
        if (shell.error) return shell;
        if (!f.isUserEmailConfirmed(shell.data[0].role)) {
            return onError(shell);
        }
        return shell;
    };

    const userIsNotUpdated = s.composePromise(
        s.setError,
        s.setStatus(500),
        s.setData(e.userUpdateError),
    );
    const checkUserUpdated = onError => shell => {
        if (shell.error) return shell;
        if (!shell.data.nModified || shell.data.nModified !== 1 ) {
            return onError(shell);
        }
        return shell;
    };

    return await s.composePromise(
        s.sendResponse,
        s.setResponse({name: login, token: token}),
        checkUserUpdated(userIsNotUpdated),
        f.userUpdate(userFindOptions, userUpdateOptions),
        checkEmailConfirmed(emailIsNotConfirmed),
        checkUserPassword(passwordIsWrong),
        checkUserFound(userFound)(userNotFound),
        f.userFind(userFindOptions),
        s.createShell
    )(res);

}
