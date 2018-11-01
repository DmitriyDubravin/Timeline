const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    const {author, category} = req.body;
    const getSubcategoriesOptions = {
        user: author,
        category
    }

    const {data, err} = await f.tryCatch(f.getSubcategories(getSubcategoriesOptions));
    err && e.getSubcategoriesError(res);

    f.success(res, {
        subcategoriesList: data
    });

}