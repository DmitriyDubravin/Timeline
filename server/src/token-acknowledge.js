const f = require('./support/functions');

module.exports = async function(req, res) {

    const token = req.body.token;
    const user = {
        token: token
    }

    const found = await f.to(f.findUser(user));
    if (found.err) res.status(500).send({message: '\nServer error while searching for token\n\n'});

    if (f.isUserFound(found.data)) {
        res.send({
            message: "You've been logged in",
            status: 'success',
            data: {
                name: found.data[0].name,
                token: token
            }
        });

    } else {

        res.send({
            message: "Wrong login / password",
            status: 'error',
            data: {
                name: false
            }
        });
    }
}
