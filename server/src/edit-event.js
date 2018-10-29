const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    console.log('\n\n\nEDIT EVENT QUERY\n\n\n');

    const {author, _id, ...rest} = req.body;

    const findEventOptions = {
        user: author,
        _id
    }

    const {data, err} = await f.tryCatch(f.findEvents(findEventOptions));
    err && e.findEventsError(res);



    const updateEventOptions = {
        user: author,
        ...rest
    }
    if(f.isEventFound(data)) {
        const updatedEvent = await f.tryCatch(f.editEvent(findEventOptions, updateEventOptions))
        updatedEvent.err && e.updateEventError(res);

        f.success(res, {updatedEvent: updatedEvent.data});
    } else {
        f.failure(res);
    }

}