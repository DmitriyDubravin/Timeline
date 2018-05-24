const f = require('./support/functions');

module.exports = async function(req, res) {
    const login = req.body.login;
    const password = req.body.password;
    const user = {
        name: login
    }
    console.log(login, password);

    const found = await f.to(f.findUser(user));
    if (found.err) res.status(500).send({message: '\nServer error while searching for user name\n\n'});

    if (f.isUserFound(found.data) && f.isPasswordMatches(password, found.data)) {

        const removed = await f.to(f.removeUser(user));
        if (removed.err) res.status(500).send({message: '\nServer error while removing user\n\n'});

        res.send({
            message: "User were deleted!",
            status: 'success',
            data: {
                name: false
            }
        });

    } else {

        res.send({
            message: "Wrong password",
            status: 'error',
            data: {
                name: false
            }
        });

    }
}