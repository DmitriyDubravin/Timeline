const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    const name = req.body.name;
    const findUserNameOptions = {name: name}

    const foundUser = await f.tryCatch(f.findUser(findUserNameOptions));
    if (foundUser.err) e.findUserNameError(res);

    if (f.isUserFound(foundUser.data)) {
        // f.success(res, {addedEvent: addedEvent.data});
        res.send({
            message: "User found"
        })
    } else {
        
    }
}

// TODO! DELETE THIS FILE ?!