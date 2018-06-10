const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    const findUsersOptions = {}

    const foundUsers = await f.tryCatch(f.findUsers(findUsersOptions));
    foundUsers.err && e.findUsersError(res);

    let usersList = foundUsers.data.map(user => user.name);
    f.success(res, {usersList: usersList});

}