const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    const {name, id} = req.body;

    const findEventsOptions = {
        user: name,
        _id: id
    }

    const foundEvent = await f.tryCatch(f.findEvents(findEventsOptions));
    foundEvent.err && e.findEventsError(res);

    let event = foundEvent.data;
    f.success(res, {event: event});

}