const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    console.log('\n\n\nNEW REMOVE QUERY\n\n\n');

    const {author, ...rest} = req.body;
    const eventData = {
        user: author,
        ...rest
    }

    // TODO! test again: still deletes when error before removing. so error not working properly
    const {data, err} = await f.tryCatch(f.removeEvent(eventData));
    err && e.removeEventError(res);

    f.success(res, {removedEvent: data});

}