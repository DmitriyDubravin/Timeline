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
        s.setStatus(500),
        s.setData(e.findUserNameError),
    );
    const ifUserFound = onSuccess => onError => shell => {
        if (shell.error) return shell;
        if (shell.data.length) return onSuccess(shell);
        return onError(shell);
    }

    const checkPassword = password => shell => {
        if (shell.error) return shell;
        if (!f.isPasswordMatches(password, shell.data[0].password)) {
            s.setError(shell);
        }
        return shell;
    }

    return await s.composePromise(
        s.sendResponse,
        s.skipIfError(s.setResponse({name: login, token: token})),
        s.skipIfError(s.onErrorMessage(e.userUpdateError)),
        s.skipIfError(s.fireQuery(f.updateUser)),
        s.skipIfError(s.setQuery(userFindOptions, userUpdateOptions)),
        s.skipIfError(s.onErrorMessage(e.userEmailError)),
        s.skipIfError(s.checkEmailConfirmed),
        s.skipIfError(s.onErrorMessage(e.userPasswordError)),
        s.log,
        checkPassword(password),
        ifUserFound(userFound)(userNotFound),
        f.userFind(userFindOptions),
        s.createShell
    )(res);

}
