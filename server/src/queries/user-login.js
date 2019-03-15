const s = require('./../support/support');
const f = require('./../support/functions');
const e = require('./../support/errors');

module.exports = async function(req, res) {

    console.log('\n\nUSER LOGIN\n\n');

    const {login, password} = req.body;
    const findUserNameOptions = {name: login}


    const checkPassword = shell => {
        if (!f.isPasswordMatches(password, shell.body.data[0].password)) {
            return ({...shell, error: true});
        }
        return shell;
    }

    const checkEmailConfirmed = shell => {
        // TODO: manualy set role 'user' to pass this check !
        if (!f.isUserEmailConfirmed(shell.body.data[0]).role) {
            console.log(1);
            return ({...shell, error: true});
        }
        return shell;
    }

    const a = () => {};

    return await s.composePromise(
        s.skipIfError(s.onErrorMessage(e.userEmailError)),
        s.log,
        s.skipIfError(checkEmailConfirmed),
        s.skipIfError(s.onErrorMessage(e.userPasswordError)),
        s.skipIfError(checkPassword),
        s.skipIfError(s.onErrorMessage(e.findUserNameError)),
        s.skipIfError(s.fireQuery(f.findUser)),
        s.skipIfError(s.setQuery(findUserNameOptions)),
        s.createShell
    )(res);


    const token = f.generateToken(login + password);
    const updateUserTokenOptions = {token: token}
    const updatedUser = await f.tryCatch(f.updateUser(findUserNameOptions,
        updateUserTokenOptions));
    updatedUser.err && e.updateUserTokenError(res);
    f.success(res, {
        name: login,
        token: token
    });


    // const foundUser = await f.tryCatch(f.findUser(findUserNameOptions));
    // foundUser.err && e.findUserNameOptions(res);
    // if (f.isUserFound(foundUser.data) && f.isPasswordMatches(password, foundUser.data[0].password)) {
    //     if (f.isUserEmailConfirmed(foundUser.data[0])) {
    //         const token = f.generateToken(login + password);
    //         const updateUserTokenOptions = {token: token}
    //         const updatedUser = await f.tryCatch(f.updateUser(findUserNameOptions,
    //             updateUserTokenOptions));
    //         updatedUser.err && e.updateUserTokenError(res);
    //         f.success(res, {
    //             name: login,
    //             token: token
    //         });
    //     } else {
    //         f.failure(res, {
    //             cause: 'email'
    //         });
    //     }
    // } else {
    //     f.failure(res);
    // }
}
