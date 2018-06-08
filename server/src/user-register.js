const f = require('./support/functions');
const e = require('./support/errors');
const sendEmail = require('./email-sender');

module.exports = async function(req, res) {

    const login = req.body.login;
    const password = req.body.password;
    const email = req.body.email;
    const findUserNameOptions =  {name: login}

    const foundUser = await f.tryCatch(f.findUser(findUserNameOptions));
    if (foundUser.err) e.findUserNameError(res);

    if (f.isUserFound(foundUser.data)) {

        res.send({
            message: "This username is already taken!",
            status: 'error'
        });

    } else {

        const hashedPassword = f.hashPassword(password);
        const token = f.generateToken(login + password);
        const verificationHash = token.slice(-12);

        let addUserOptions = {
            name: login,
            password: hashedPassword,
            email: email,
            token: token,
            role: verificationHash
        };

        const addedUser = await f.tryCatch(f.addUser(addUserOptions));
        if (addedUser.err) 

        if (addedUser.data.name === login) {
            // SEND EMAIL
            sendEmail(email, verificationHash);

            res.send({
                message: "New user has been added! Check your email to activate your account.",
                status: 'success',
                data: {
                    name: login,
                    token: token
                }
            });
        } else {
            res.send({
                message: "New user hasn't been added due to unknown error",
                status: 'error'
            });
        }

    }
}