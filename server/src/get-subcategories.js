const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    const {name, category} = req.body;
    const getSubcategoriesOptions = {user: name, category: category}

    const foundSubcategories = await f.tryCatch(f.getSubcategories(getSubcategoriesOptions));
    foundSubcategories.err && e.getSubcategoriesError(res);

    f.success(res, {
        subcategories: foundSubcategories.data
    });

}