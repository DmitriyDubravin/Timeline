const s = require('./../support/support');
const f = require('./../support/functions');
const e = require('./../support/errors');

module.exports = async function(req, res) {

    console.log('\n\nUSER PASSWORD UPDATE\n\n');

    const {login, password, newPassword} = req.body;

    const userFindOptions = {name: login}
    const updateUserPasswordOptions = {password: f.hashPassword(newPassword)};

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
            onError(shell);
        }
        return shell;
    }

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
        checkUserUpdated(userIsNotUpdated),
        f.userUpdate(userFindOptions, updateUserPasswordOptions),
        checkUserPassword(passwordIsWrong),
        checkUserFound(userFound)(userNotFound),
        f.userFind(userFindOptions),
        s.createShell
    )(res);


    // const foundUser = await f.tryCatch(f.findUser(userFindOptions));
    // foundUser.err && e.findUserNameError(res);

    // if (f.isUserFound(foundUser.data) && f.isPasswordMatches(password, foundUser.data)) {

    //     const updateUserPasswordOptions = {password: f.hashPassword(newPassword)};
    //     const updatedUser = await f.tryCatch(f.updateUser(userFindOptions, updateUserPasswordOptions))
    //     updatedUser.err && e.updateUserPasswordError(res);

    //     f.success(res);

    // } else {

    //     f.failure(res);

    // }
}