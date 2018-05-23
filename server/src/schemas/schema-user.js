const mongoose = require('mongoose');

module.exports = mongoose.model(
    'Users',
    mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    })
);