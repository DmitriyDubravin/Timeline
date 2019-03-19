const s = require('./../support/support');
const db = require('./../support/functions');
const e = require('./../support/errors');
const sendEmail = require('../email-sender');

module.exports = async function(req, res) {

    console.log('\n\nUSER CREATE\n\n');

    const {login, email, password} = req.body;
    const findUserNameOptions = {name: login}

    const hashedPassword = db.hashPassword(password);
    const verificationHash = db.generateVerificationHash(login + password);

    const addUserOptions = {
        name: login,
        password: hashedPassword,
        email: email,
        token: "no token",
        role: verificationHash
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
        sendEmail(email, verificationHash);
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


//     const foundUser = await f.tryCatch(f.findUser(findUserNameOptions));
//     foundUser.err && e.findUserNameError(res);

//     if (!f.isUserFound(foundUser.data)) {

//         const hashedPassword = f.hashPassword(password);
//         const verificationHash = f.generateVerificationHash(login + password);

//         const addUserOptions = {
//             name: login,
//             password: hashedPassword,
//             email: email,
//             token: "no token",
//             role: verificationHash
//         };

//         const addedUser = await f.tryCatch(f.addUser(addUserOptions));
//         addedUser.err && e.addUserError(res);

//         // SEND EMAIL
//         sendEmail(email, verificationHash);

//         f.success(res);

//     } else {

//         f.failure(res);

//     }
}