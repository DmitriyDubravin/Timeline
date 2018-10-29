const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    const {author} = req.body;
    const getTypesOptions = {
        user: author
    }

    const foundTypes = await f.tryCatch(f.getTypes(getTypesOptions));
    foundTypes.err && e.getTypesError(res);

    f.success(res, {
        data: foundTypes.data
    });

}