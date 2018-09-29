const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    const {name, type} = req.body;
    const getCategoriesOptions = {
        user: name,
        type: type
    };

    const foundCategories = await f.tryCatch(f.getCategories(getCategoriesOptions));
    foundCategories.err && e.getCategoriesError(res);

    f.success(res, {
        categories: foundCategories.data
    });

}