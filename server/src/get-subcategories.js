const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    const {author, data} = req.body;
    const getSubcategoriesOptions = {
        user: author,
        category: data
    }

    const foundSubcategories = await f.tryCatch(f.getSubcategories(getSubcategoriesOptions));
    foundSubcategories.err && e.getSubcategoriesError(res);

    f.success(res, {
        data: foundSubcategories.data
    });

}