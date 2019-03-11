const s = require('./../support/support');
const f = require('./../support/functions');
const e = require('./../support/errors');

module.exports = async function(req, res) {

    console.log('\n\nUSER TOKEN CHECK\n\n');

    const {token} = req.body;
    const query = {
        token
    }

    return await s.composePromise(
        s.sendResponse,
        s.onErrorMessage(e.userTokenCheckError),
        s.fireQuery(f.findUser),
        s.setQuery(query),
        s.createShell
    )(res);

}
