const f = require('./support/functions');

module.exports = async function(req, res) {

    const found = await f.to(f.findUsers({}));
    if (found.err) res.status(500).send({message: '\nServer error while searching for users\n\n'});

    if (f.isUserFound(found.data)) {
        let usersList = found.data.map(user => {
            return user.name
        })

        res.send({
            message: "Users were found",
            status: 'success',
            data: {
                usersList: usersList
            }
        });

    } else {

        res.send({
            message: "New user was added!",
            status: 'success',
            data: {
                usersList: null
            }
        });

    }
}