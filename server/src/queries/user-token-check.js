const s = require('./../support/support');
const f = require('./../support/functions');
const e = require('./../support/errors');

module.exports = async function(req, res) {

    console.log('\n\nUSER TOKEN CHECK\n\n');

    const {token} = req.body;
    const userTokenCheckOptions = { token: token };

    const checkUserFound = shell => {
        if (!shell.body.data.length) {
            return s.composePromise(
                s.setStatus(500),
                s.setData(e.userTokenCheckError),
            )(shell);
        }
        return shell;
    }

    return await s.composePromise(
        s.sendResponse,
        checkUserFound,
        s.fireQuery(f.findUser),
        s.setQuery(userTokenCheckOptions),
        s.createShell
    )(res);

}
