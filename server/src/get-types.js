const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    console.log('\n\n\nGET TYPES LIST QUERY\n\n\n');

    const {author} = req.body;
    const getTypesOptions = {
        user: author
    }

    const {data, err} = await f.tryCatch(f.getTypes(getTypesOptions));
    err && e.getTypesError(res);

    f.success(res, {
        typesList: data
    });

}