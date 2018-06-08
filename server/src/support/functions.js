const bcrypt = require('bcryptjs');
const Users = require('../models/users');
const Events = require('../models/events');

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
    tryCatch: promise => promise.then(data => ({data})).catch(err => ({err})),
    getTypes: options => Events.distinct("type", options),
    getCategories: options => Events.distinct("category", options),
    getSubcategories: options => Events.distinct("subcategory", options),

}
