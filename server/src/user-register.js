const f = require('./support/functions');
const sendEmail = require('./email-sender');

module.exports = async function(req, res) {
    const login = req.body.login;
    const password = req.body.password;
    const email = req.body.email;
    let user = {
        name: login
    }

    const found = await f.to(f.findUser(user));
    if (found.err) res.status(500).send({message: '\nServer error while searching for user name\n\n'});

    if (f.isUserFound(found.data)) {

        res.send({
            message: "This username is already taken!",
            status: 'error'
        });

    } else {

        const hashedPassword = f.hashPassword(password);
        const token = f.generateToken(login + password);
        const verificationHash = token.slice(-12);

        let addingData = {
            name: login,
            password: hashedPassword,
            email: email,
            token: token,
            role: verificationHash
        };

        const added = await f.to(f.addUser(addingData));
        if (added.err) res.status(500).send({message: '\nServer error while adding new user\n\n'});

        if (added.data.name === login) {
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