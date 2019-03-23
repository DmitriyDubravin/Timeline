const s = require('./../support/support');
const db = require('./../support/functions');
const e = require('./../support/errors');

module.exports = async function(req, res) {

    const {login, password} = req.body;
    const findUserNameOptions = {
        name: login
    };

    // const foundUser = await f.tryCatch(f.findUser(findUserNameOptions));
    // foundUser.err && e.findUserNameError(res);

    // if (f.isUserFound(foundUser.data) && f.isPasswordMatches(password, foundUser.data)) {

    //     const removedUser = await f.tryCatch(f.removeUser(findUserNameOptions));
    //     removedUser.err && e.removeUserError(res);

    //     f.success(res);

    // } else {

    //     f.failure(res);

    // }


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
        console.log(password, shell.data[0].password);
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