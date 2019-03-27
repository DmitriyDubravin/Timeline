const s = require('./../support/support');
const db = require('./../support/functions');
const e = require('./../support/errors');

module.exports = async function(req, res) {

    console.log('\n\n\nEVENT CREATE\n\n\n');

    const {author, token, ...rest} = req.body;
    const eventCreateOptions = {
        user: author,
        ...rest
    }
    const findUserNameOptions = {name: author}

    const eventCreated = s.composePromise(
        s.setStatus(200)
    );
    const eventNotCreated = s.composePromise(
        s.setError,
        s.setStatus(500),
        s.setData('event NOT created'),
    );

    const checkEventCreated = onSuccess => onError => shell => {
        if (shell.error) return shell;
        if (shell.data._id) return onSuccess(shell);
        return onError(shell);
    }

    const userFound = s.composePromise(
        s.setStatus(200)
    );
    const userNotFound = s.composePromise(
        s.setError,
        s.setStatus(500),
        s.setData('user not found'),
    );
    const checkUserFound = onSuccess => onError => shell => {
        if (shell.error) return shell;
        if (shell.data.length) return onSuccess(shell);
        return onError(shell);
    }

    const tokenIsWrong = s.composePromise(
        s.setError,
        s.setStatus(500),
        s.setData('token is wrong'),
    );
    const checkUserToken = onError => shell => {
        if (shell.error) return shell;
        if (!token === shell.data[0].token) {
            return onError(shell);
        }
        return shell;
    }

    return await s.composePromise(
        s.sendResponse,
        checkEventCreated(eventCreated)(eventNotCreated),
        db.eventCreate(eventCreateOptions),
        // TODO: do I really need to check user here?
        checkUserToken(tokenIsWrong),
        checkUserFound(userFound)(userNotFound),
        db.userFind(findUserNameOptions),
        s.createShell
    )(res);

}