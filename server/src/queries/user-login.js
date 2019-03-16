const s = require('./../support/support');
const f = require('./../support/functions');
const e = require('./../support/errors');

module.exports = async function(req, res) {

    console.log('\n\nUSER LOGIN\n\n');

    const {login, password} = req.body;
    const token = f.generateToken(login + password);
    const userFindOptions = {name: login}
    const userUpdateOptions = {token: token}

    return await s.composePromise(
        s.sendResponse,
        s.skipIfError(s.setResponse({name: login, token: token})),
        s.skipIfError(s.onErrorMessage(e.userUpdateError)),
        s.skipIfError(s.fireQuery(f.updateUser)),
        s.skipIfError(s.setQuery(userFindOptions, userUpdateOptions)),
        s.skipIfError(s.onErrorMessage(e.userEmailError)),
        s.skipIfError(s.checkEmailConfirmed),
        s.skipIfError(s.onErrorMessage(e.userPasswordError)),
        s.skipIfError(s.checkPassword(password)),
        s.skipIfError(s.onErrorMessage(e.findUserNameError)),
        s.skipIfError(s.fireQuery(f.findUser)),
        s.skipIfError(s.setQuery(userFindOptions)),
        s.createShell
    )(res);

}
