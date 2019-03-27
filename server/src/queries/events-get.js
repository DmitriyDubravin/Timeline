const s = require('./../support/support');
const f = require('./../support/functions');
const e = require('./../support/errors');

module.exports = async function(req, res) {

    console.log('\n\nEVENTS GET\n\n');

    const {author, start, finish} = req.body;
    const findEventsOptions = {
        user: author,
        start: {$gte: start},
        finish: {$lte: finish}
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
        f.eventsFind(findEventsOptions),
        s.createShell
    )(res);

}
