const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    console.log('\n\n\nNEW EDIT QUERY\n\n\n');

    const {
        _id,
        name,
        start,
        startHour,
        startMinute,
        finish,
        finishHour,
        finishMinute,
        type,
        category,
        subcategory,
        comment
    } = req.body;

    const updateEventOptions = {
        user: name,
        start: start,
        startHour: startHour,
        startMinute: startMinute,
        finish: finish,
        finishHour: finishHour,
        finishMinute: finishMinute,
        type: type,
        category: category,
        subcategory: subcategory,
        comment: comment
    }

    const findEventOptions = {
        user: name,
        _id: _id
    }

    const foundEvent = await f.tryCatch(f.findEvents(findEventOptions));
    foundEvent.err && e.findEventsError(res);

    if(f.isEventFound(foundEvent.data)) {
        const updatedEvent = await f.tryCatch(f.editEvent(findEventOptions, updateEventOptions))
        updatedEvent.err && e.updateEventError(res);

        f.success(res, {updatedEvent: updatedEvent.data});
    } else {
        f.failure(res);
    }

}