const s = require('./../support/support');
const f = require('./../support/functions');
const e = require('./../support/errors');

module.exports = async function(req, res) {

    console.log('\n\n\nTYPES GET\n\n\n');

    const {author} = req.body;
    const getTypesOptions = {
        user: author
    }

    const typesFound = s.composePromise(
        s.setStatus(200)
    );
    const typesNotFound = s.composePromise(
        s.setError,
        s.setStatus(500),
        s.setData('error while searching types'),
    );
    const checkTypesFound = onSuccess => onError => shell => {
        if (shell.error) return onError(shell);
        return onSuccess(shell);
    }

    return await s.composePromise(
        s.sendResponse,
        checkTypesFound(typesFound)(typesNotFound),
        f.typesGet(getTypesOptions),
        s.createShell
    )(res);

}