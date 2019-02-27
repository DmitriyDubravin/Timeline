const f = require('./support/functions');
const e = require('./support/errors');
const sendEmail = require('./email-sender');

module.exports = async function(req, res) {

    const {login, email, password} = req.body;
    const findUserNameOptions = {name: login}

    console.log(req.body);
    console.log(login, email, password);

    f.success(res);

    // const foundUser = await f.tryCatch(f.findUser(findUserNameOptions));
    // foundUser.err && e.findUserNameError(res);

    // if (!f.isUserFound(foundUser.data)) {

    //     const hashedPassword = f.hashPassword(password);
    //     const verificationHash = f.generateVerificationHash(login + password);

    //     const addUserOptions = {
    //         name: login,
    //         password: hashedPassword,
    //         email: email,
    //         token: "no token",
    //         role: verificationHash
    //     };

    //     const addedUser = await f.tryCatch(f.addUser(addUserOptions));
    //     addedUser.err && e.addUserError(res);

    //     // SEND EMAIL
    //     sendEmail(email, verificationHash);

    //     f.success(res);

    // } else {

    //     f.failure(res);

    // }
}