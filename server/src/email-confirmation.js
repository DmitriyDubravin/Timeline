const f = require('./support/functions');
const sendEmail = require('./email-sender');

module.exports = async function(req, res) {

    const hash = req.params['0'];

    let user = {
        role: hash
    }

    const found = await f.to(f.findUser(user));
    if (found.err) res.status(500).send({message: '\nServer error while searching for email verification hash\n\n'});

    if (f.isUserFound(found.data)) {

        const updated = await f.to(f.updateUser(user, {role: 'user'}));
        if (updated.err) res.status(500).send({message: '\nServer error while updating users role\n\n'});

        res.send({
            message: "Email were successfully verified",
            status: 'success',
        });

    } else {

        res.send({
            message: "verification link is broken",
            status: 'error',
        });
    }

}