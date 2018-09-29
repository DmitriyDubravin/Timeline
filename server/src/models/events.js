const mongoose = require('mongoose');

let eventsSchema = new mongoose.Schema({
    // id: String,
    user: String,
    start: String || Number,
    startHour: String,
    startMinute: String,
    finish: String || Number,
    finishHour: String,
    finishMinute: String,
    // duration: String,
    type: String,
    // typecolor: String,
    category: String,
    subcategory: String,
    // status: String,
    comment: String
});

eventsSchema.index({comment: 'text'});

module.exports = mongoose.model(
    'Events',
    eventsSchema
);
