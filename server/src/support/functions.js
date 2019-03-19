const bcrypt = require('bcryptjs');
const Users = require('../models/users');
const Events = require('../models/events');

module.exports = {

    userCreate: (...query) => async shell => {
        if (shell.error) return shell;
        try {
            return {
                ...shell,
                error: false,
                data: await new Users(...query).save()
            }
        } catch(error) {
            return {
                ...shell,
                error: true,
                data: error
            }
        }
    },
    userFind: (...query) => async shell => {
        if (shell.error) return shell;
        try {
            return {
                ...shell,
                error: false,
                data: await Users.find(...query).exec()
            }
        } catch(error) {
            return {
                ...shell,
                error: true,
                data: error
            }
        }
    },
    userUpdate: (...query) => async shell => {
        if (shell.error) return shell;
        try {
            return {
                ...shell,
                error: false,
                data: await Users.update(...query)
            }
        } catch(error) {
            return {
                ...shell,
                error: true,
                data: error
            }
        }
    },

    addUser: userData => new Users(userData).save(),
    updateUser: (user, data) => Users.update(user, data),
    removeUser: user => Users.remove(user),
    findUser: user => {
        // throw 'Errrooor';
        return Users.find(user).exec()
    },

    findUsers: users => Users.find(users).sort({name: 1}).exec(),
    findEvents: queryData => {
        return Events.find(queryData).sort({start: 1}).exec()
    },

    isUserFound: response => response.length > 0,
    isEventFound: response => response.length > 0,
    isUserEmailConfirmed: role => role.length < 10,
    isPasswordMatches: (insertedPassword, password) => bcrypt.compareSync(insertedPassword, password),
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
