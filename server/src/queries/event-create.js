const s = require('./../support/support');
const db = require('./../support/functions');
const e = require('./../support/errors');

module.exports = async function(req, res) {

    console.log('\n\n\nEVENT CREATE\n\n\n');

    const {author, ...rest} = req.body;
    const eventCreateOptions = {
        user: author,
        ...rest
    }

    const eventCreated = s.composePromise(
        s.setStatus(200)
    );
    const eventNotCreated = s.composePromise(
        s.setError,
        s.setStatus(500),
        s.setData('event NOT created'),
    );

    const checkEventCreated = onSuccess => onError => shell => {
        console.log(3, shell.data);
        if (shell.error) return shell;
        if (shell.data.length) return onSuccess(shell);
        return onError(shell);
    }

    return await s.composePromise(
        s.sendResponse,
        checkEventCreated(eventCreated)(eventNotCreated),
        db.eventCreate(eventCreateOptions),
        s.createShell
    )(res);

}