const mongoose = require('mongoose');

module.exports = mongoose.model(
    'Events',
    mongoose.Schema({
        id: String,
        user: String,
        start: String,
        finish: String,
        duration: String,
        type: String,
        typecolor: String,
        category: String,
        subcategory: String,
        status: String,
        comment: String
    })
);