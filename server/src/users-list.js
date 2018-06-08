const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    const findUsersOptions = {}

    const foundUsers = await f.tryCatch(f.findUsers(findUsersOptions));
    if (foundUsers.err) e.findUsersError(res);

    if (f.isUserFound(foundUsers.data)) {
        let usersList = foundUsers.data.map(user => user.name);

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