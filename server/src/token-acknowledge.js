const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    console.log('\n\n\nTOKEN CHECK QUERY\n\n\n');

    const {token} = req.body;
    const findUserTokenOptions = {
        token
    }

    const {data, err} = await f.tryCatch(f.findUser(findUserTokenOptions));
    err && e.findUserTokenError(res);

    if (f.isUserFound(data)) {

        f.success(res, {
            name: data[0].name
        });

    } else {

        f.failure(res);

    }
}
