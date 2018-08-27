const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    console.log('\n\n\nNEW REMOVE QUERY\n\n\n');

    const {name, start, finish, type, category, subcategory, comment} = req.body;
    const eventData = {
        user: name,
        start: start,
        finish: finish,
        type: type,
        category: category,
        subcategory: subcategory,
        comment: comment
    }

    const addedEvent = await f.tryCatch(f.addEvent(eventData));
    addedEvent.err && e.addEventError(res);

    f.success(res, {addedEvent: addedEvent.data});

}