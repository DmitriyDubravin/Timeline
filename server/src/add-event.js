const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    console.log('\n\n\nNEW ADD QUERY\n\n\n');

    const {name, ...rest} = req.body;
    const eventData = {
        user: name,
        ...rest
    }

    const addedEvent = await f.tryCatch(f.addEvent(eventData));
    addedEvent.err && e.addEventError(res);

    f.success(res, {addedEvent: addedEvent.data});

}