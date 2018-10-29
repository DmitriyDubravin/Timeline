const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    const {author, data} = req.body;
    const getCategoriesOptions = {
        user: author,
        type: data
    };

    const foundCategories = await f.tryCatch(f.getCategories(getCategoriesOptions));
    foundCategories.err && e.getCategoriesError(res);

    f.success(res, {
        data: foundCategories.data
    });

}