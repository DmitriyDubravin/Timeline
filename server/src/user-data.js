const f = require('./support/functions');

module.exports = async function(req, res) {

    const name = req.body.name;
    let user = {
        name: name
    }
    console.log('error?', name )

    const found = await f.to(f.findUser(user));
    if (found.err) res.status(500).send({message: '\nServer error while searching for user name\n\n'});

    if (f.isUserFound(found.data)) {
        res.send({
            message: "User found"
        })
    } else {

    }
}