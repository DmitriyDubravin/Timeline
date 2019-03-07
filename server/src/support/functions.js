const bcrypt = require('bcryptjs');
const Users = require('../models/users');
const Events = require('../models/events');

module.exports = {

    addUser: userData => new Users(userData).save(),
    updateUser: (user, data) => Users.update(user, data),
    removeUser: user => Users.remove(user),
    findUser: user => Users.find(user).exec(),

    findUsers: users => Users.find(users).sort({name: 1}).exec(),
    findEvents: queryData => {
        // throw 'errrrrrrrrrrrrror';
        return Events.find(queryData).sort({start: 1}).exec()
    },

    isUserFound: response => response.length > 0,
    isEventFound: response => response.length > 0,
    isUserEmailConfirmed: user => user.role.length < 10,
    isPasswordMatches: (password, response) => bcrypt.compareSync(password, response[0].password),
    hashPassword: password => bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    generateToken: secret => bcrypt.hashSync(secret , bcrypt.genSaltSync(10)),
    generateVerificationHash: secret => bcrypt.hashSync(secret , bcrypt.genSaltSync(10)).slice(-12),
    tryCatch: promise => promise.then(data => ({data})).catch(err => ({err})),
    getTypes: options => Events.distinct("type", options),
    getCategories: options => Events.distinct("category", options),
    getSubcategories: options => Events.distinct("subcategory", options),

    addEvent: eventData => new Events(eventData).save(),
    editEvent: (event, data) => Events.findOneAndUpdate(event, data, {new: true}),
    removeEvent: event => Events.remove(event),

    success: (res, data = {}) => res.send({...data, success: true}), // TODO -> delete 'status'
    failure: (res, data = {}) => res.send({...data, success: false}), // TODO -> delete 'status'


    search: query => Events.find(query)

}
