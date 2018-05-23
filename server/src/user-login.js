const f = require('./support/functions');

module.exports = async function(req, res) {

    const login = req.body.login;
    const password = req.body.password;
    const user = {
        name: login
    }

    const found = await f.to(f.findUser(user));
    if (found.err) res.status(500).send({message: '\nServer error while searching for user name\n\n'});

    if (f.isUserFound(found.data) && f.isPasswordMatches(password, found.data)) {

        const token = f.generateToken(login + password);

        const updated = await f.to(f.updateUser(user, {token: token}));
        if (updated.err) res.status(500).send({message: '\nServer error while updating token\n\n'});

        res.send({
            data: {
                message: "You've been logged in",
                status: 'success',
                data: {
                    name: found.data[0].name,
                    token: token
                }
            }
        });

    } else {

        res.send({
            data: {
                message: "Wrong login / password",
                status: 'error',
                data: {
                    name: 'guest'
                }
            }
        });
    }
}
