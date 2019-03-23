const s = require('./../support/support');
const db = require('./../support/functions');
const e = require('./../support/errors');
const sendEmail = require('../email-sender');

module.exports = async function(req, res) {

    console.log('\n\nUSER CREATE\n\n');

    const {login, email, password} = req.body;
    const findUserNameOptions = {name: login}

    const hashedPassword = db.hashPassword(password);
    // const verificationHash = db.generateVerificationHash(login + password);

    const addUserOptions = {
        name: login,
        password: hashedPassword,
        email: email,
        token: "no token",
        role: "user" // TODO: verificationHash
    };

    const userFound = s.composePromise(
        s.setError,
        s.setStatus(500),
        s.setData('username is already taken'),
    );
    const userNotFound = s.composePromise(
        s.setStatus(200)
    );
    const checkUserFound = onSuccess => onError => shell => {
        if (shell.error) return shell;
        if (shell.data.length) return onSuccess(shell);
        return onError(shell);
    }

    const doSomethingElse = shell => {
        if (shell.error) return shell;
        // TODO: got error on creation with a@b.c email : investigate
        // sendEmail(email, verificationHash);
        return shell;
    }

    return await s.composePromise(
        s.sendResponse,
        doSomethingElse,
        db.userCreate(addUserOptions),
        checkUserFound(userFound)(userNotFound),
        db.userFind(findUserNameOptions),
        s.createShell
    )(res);

}