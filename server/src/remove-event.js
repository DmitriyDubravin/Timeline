const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    console.log('\n\n\nNEW REMOVE QUERY\n\n\n');

    const {name, _id} = req.body;
    const eventData = {
        user: name,
        _id: _id
    }

    const removedEvent = await f.tryCatch(f.removeEvent(eventData));
    removedEvent.err && e.removeEventError(res);

    f.success(res, {removedEvent: removedEvent.data});

}