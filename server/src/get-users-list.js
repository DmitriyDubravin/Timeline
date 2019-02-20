const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    console.log('\n\n\nGET USERS LIST QUERY\n\n\n');

    const findUsersOptions = {}

    const {data, err} = await f.tryCatch(f.findUsers(findUsersOptions));
    err && e.findUsersError(res);

    const usersList = data.map(user => {
        return {
            _id: user._id,
            name: user.name
        }
    });
    f.success(res, {usersList: usersList});

}