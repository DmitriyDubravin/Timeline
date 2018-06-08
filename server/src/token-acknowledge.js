const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    const findUserTokenOptions = {token: req.body.token}

    const foundUser = await f.tryCatch(f.findUser(findUserTokenOptions));
    if (foundUser.err) e.findUserTokenError(res);

    if (f.isUserFound(foundUser.data)) {
        res.send({
            message: "You've been logged in",
            status: 'success',
            data: {
                name: foundUser.data[0].name
            }
        });

    } else {

        res.send({
            status: 'error',
            data: {
                name: false
            }
        });
    }
}
