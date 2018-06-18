const mongoose = require('mongoose');

module.exports = mongoose.model(
    'Events',
    mongoose.Schema({
        // id: String,
        user: String,
        start: Number,
        finish: Number,
        // duration: String,
        type: String,
        // typecolor: String,
        category: String,
        subcategory: String,
        // status: String,
        comment: String
    })
);
