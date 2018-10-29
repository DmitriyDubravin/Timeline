const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    console.log('\n\n\nGET EVENTS LIST QUERY\n\n\n');

    const {author, start, finish} = req.body;
    const findEventsOptions = {
        user: author,
        start: {$gte: start},
        finish: {$lte: finish}
    }

    const {data, err} = await f.tryCatch(f.findEvents(findEventsOptions));
    err && e.findEventsError(res);

    f.success(res, {eventsList: data});

}