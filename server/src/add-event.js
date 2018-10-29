const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    console.log('\n\n\nADD EVENT QUERY\n\n\n');

    const {author, ...rest} = req.body;
    const eventData = {
        user: author,
        ...rest
    }

    const {data, err} = await f.tryCatch(f.addEvent(eventData));
    err && e.addEventError(res);

    f.success(res, {addedEvent: data});

}