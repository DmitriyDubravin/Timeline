const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    const {author, type} = req.body;
    const getCategoriesOptions = {
        user: author,
        type
    };

    const {data, err} = await f.tryCatch(f.getCategories(getCategoriesOptions));
    err && e.getCategoriesError(res);

    f.success(res, {
        categoriesList: data
    });

}