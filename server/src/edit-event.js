const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    const {name, _id, start, finish, type, category, subcategory, comment} = req.body;
    const updateEventOptions = {
        start: start,
        finish: finish,
        type: type,
        category: category,
        subcategory: subcategory,
        comment: comment
    }

    const findEventOptions = {
        user: name,
        _id: id
    }

    const foundEvent = await f.tryCatch(f.findEvents(findEventsOptions));
    foundEvent.err && e.findEventsError(res);

    if(f.isEventFound(foundEvent.data)) {
        console.log('\n\n\n111');
        // const updatedEvent = await f.tryCatch(f.editEvent(findEventOptions, updateEventOptions))
        // updatedEvent && e.updateEventError(res);

        f.success(res);
    } else {
        console.log('\n\n\n222');
        f.failure(res);
    }

}