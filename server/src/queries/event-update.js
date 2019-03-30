const s = require('./../support/support');
const f = require('./../support/functions');
const e = require('./../support/errors');

module.exports = async function(req, res) {

    console.log('\n\n\nEVENT UPDATE\n\n\n');

    const {author, _id, ...rest} = req.body;

    const findEventOptions = {
        user: author,
        _id
    }
    const updateEventOptions = {
        user: author,
        ...rest
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

    const eventIsNotUpdated = s.composePromise(
        s.setError,
        s.setStatus(500),
        s.setData('error: event is not updated'),
    );
    const checkEventUpdated = onError => shell => {
        if (shell.error) return shell;
        console.log(333, shell.data._id);
        if (!shell.data._id ) {
            return onError(shell);
        }
        return shell;
    };

    return await s.composePromise(
        s.sendResponse,
        checkEventUpdated(eventIsNotUpdated),
        f.eventUpdate(findEventOptions, updateEventOptions, {new: true}),
        checkEventsFound(eventsFound)(eventsNotFound),
        f.eventsFind(findEventOptions),
        s.createShell
    )(res);

}