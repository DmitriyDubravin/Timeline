const s = require('./../support/support');
const f = require('./../support/functions');
const e = require('./../support/errors');

module.exports = async function(req, res) {

    console.log('\n\n\nEVENTS SEARCH\n\n\n');

    const {body: {author}, query} = req;
    const searchOptions = {
        user: author
    };

    for (var key in query) {
        if (query.hasOwnProperty(key) && !!query[key]) {
            searchOptions[key] = {$regex: query[key], $options: "i"};
        }
    }

    const eventsFound = s.composePromise(
        s.setStatus(200)
    );
    const eventsNotFound = s.composePromise(
        s.setError,
        s.setStatus(500),
        s.setData('error while searching events'),
    );
    const checkEventsFound = onSuccess => onError => shell => {
        if (shell.error) return onError(shell);
        return onSuccess(shell);
    }

    return await s.composePromise(
        s.sendResponse,
        checkEventsFound(eventsFound)(eventsNotFound),
        f.eventsSearch(searchOptions),
        s.createShell
    )(res);

}