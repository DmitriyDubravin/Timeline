const s = require('./support/support');
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

    return await s.composePromise(
        s.sendResponse,
        s.onErrorMessage(e.getEventsError),
        s.fireQuery(f.findEvents),
        s.setQuery(findEventsOptions),
        s.createShell
    )(res);

}
