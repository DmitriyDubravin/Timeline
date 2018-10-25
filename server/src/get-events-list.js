const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    const {author, start, finish} = req.body;
    const findEventsOptions = {
        user: author,
        start: {$gte: start},
        finish: {$lte: finish}
    }

    const foundEvents = await f.tryCatch(f.findEvents(findEventsOptions));
    foundEvents.err && e.findEventsError(res);

    let eventsList = foundEvents.data;
    f.success(res, {data: eventsList});

}