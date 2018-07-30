const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    console.log('\n\n\n000');

    const {name, _id, start, finish, type, category, subcategory, comment} = req.body;
    const updateEventOptions = {
        user: name,
        start: start,
        finish: finish,
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

        //findAndModify() to get updated event back

        f.success(res);
    } else {
        f.failure(res);
    }

}