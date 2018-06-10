const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    const {name} = req.body;
    const getTypesOptions = {user: name}

    const foundTypes = await f.tryCatch(f.getTypes(getTypesOptions));
    foundTypes.err && e.getTypesError(res);

    f.success(res, {
        types: foundTypes.data
    });

}