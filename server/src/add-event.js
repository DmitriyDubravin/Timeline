const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

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

    // console.log('\n\n\neventData', eventData, '\n\n\n');

    const addedEvent = await f.tryCatch(f.addEvent(eventData));
    addedEvent.err && e.addEventError(res);

    f.success(res);

}