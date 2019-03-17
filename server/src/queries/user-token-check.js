const s = require('./../support/support');
const f = require('./../support/functions');
const e = require('./../support/errors');

module.exports = async function(req, res) {

    console.log('\n\nUSER TOKEN CHECK\n\n');

    const {token} = req.body;
    const userTokenCheckOptions = { token: token };

    const userFound = s.composePromise(
        s.setStatus(200)
    );

    const userNotFound = s.composePromise(
        s.setStatus(500),
        s.setData(e.userTokenCheckError),
    );

    const ifUserFound = onSuccess => onError => shell => {
        if (shell.error) return shell;
        if (shell.data.length) return onSuccess(shell);
        return onError(shell);
    }

    return await s.composePromise(
        s.sendResponse,
        ifUserFound(userFound)(userNotFound),
        f.userFind(userTokenCheckOptions),
        s.createShell
    )(res);

}
