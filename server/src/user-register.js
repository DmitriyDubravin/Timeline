const f = require('./support/functions');
const e = require('./support/errors');
const sendEmail = require('./email-sender');

module.exports = async function(req, res) {

    const {login, password, email} = req.body;
    const findUserNameOptions = {name: login}

    const foundUser = await f.tryCatch(f.findUser(findUserNameOptions));
    foundUser.err && e.findUserNameError(res);

    if (!f.isUserFound(foundUser.data)) {

        const hashedPassword = f.hashPassword(password);
        const verificationHash = f.generateVerificationHash(login + password);

        const addUserOptions = {
            name: login,
            password: hashedPassword,
            email: email,
            token: "no token",
            role: verificationHash
        };

        console.log(addUserOptions);
        const addedUser = await f.tryCatch(f.addUser(addUserOptions));
        console.log(addedUser);
        addedUser.err && e.addUserError(res);

        // SEND EMAIL
        sendEmail(email, verificationHash);

        f.success(res);

    } else {

        f.failure(res);

    }
}