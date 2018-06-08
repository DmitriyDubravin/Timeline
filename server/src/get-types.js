const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    const findUserNameOptions = {name: req.body.user}
    const getTypesOptions = {user: req.body.user}

    const foundUser = await f.tryCatch(f.findUser(findUserNameOptions));
    if (foundUser.err) e.findUserNameError(res);

    if (f.isUserFound(foundUser.data)) {

        const foundTypes = await f.tryCatch(f.getTypes(getTypesOptions));
        if (foundTypes.err) e.getTypesError(res);

        res.send({
            message: "Types found",
            data: foundTypes.data
        })

    } else {
        res.send({
            message: "User not found"
        })
    }
}