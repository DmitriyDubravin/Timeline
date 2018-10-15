const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    const {token} = req.body;
    const findUserTokenOptions = {token: token}

    const foundUser = await f.tryCatch(f.findUser(findUserTokenOptions));
    foundUser.err && e.findUserTokenError(res);

    if (f.isUserFound(foundUser.data)) {

        f.success(res, {
            name: foundUser.data[0].name,
            token: token
        });

    } else {

        f.failure(res);

    }
}
