const s = require('./../support/support');
const f = require('./../support/functions');
const e = require('./../support/errors');

module.exports = async function(req, res) {

    console.log('\n\n\nEVENT REMOVE\n\n\n');

    const {author, ...rest} = req.body;
    const eventData = {
        user: author,
        ...rest
    }

    const eventRemoved = s.composePromise(
        s.setStatus(200)
    );
    const eventNotRemoved = s.composePromise(
        s.setError,
        s.setStatus(500),
        s.setData('event not removed'),
    );
    const checkEventRemoved = onSuccess => onError => shell => {
        if (shell.error) return shell;
        if (shell.data.n === 1 && shell.data.ok === 1) return onSuccess(shell);
        return onError(shell);
    }

    return await s.composePromise(
        s.sendResponse,
        checkEventRemoved(eventRemoved)(eventNotRemoved),
        f.eventRemove(eventData),
        s.createShell
    )(res);

}