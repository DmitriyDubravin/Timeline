const bcrypt = require('bcryptjs');
const Users = require('./../schemas/schema-user');

module.exports = {
    addUser: userData => new Users(userData).save(),
    updateUser: (user, data) => Users.update(user, data),
    removeUser: user => Users.remove(user),
    findUser: user => Users.find(user).exec(),
    findUsers: users => Users.find(users).sort({name: 1}).exec(),
    isUserFound: response => response.length > 0,
    isPasswordMatches: (password, response) => bcrypt.compareSync(password, response[0].password),
    hashPassword: password => bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    generateToken: secret => bcrypt.hashSync(secret , bcrypt.genSaltSync(10)),
    to: promise => promise.then(data => ({data})).catch(err => ({err}))
}
