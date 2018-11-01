const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    const {author, _id} = req.body;

    const findEventsOptions = {
        user: author,
        _id
    }

    const {data, err} = await f.tryCatch(f.findEvents(findEventsOptions));
    err && e.findEventsError(res);

    f.success(res, {
        event: data
    });

}