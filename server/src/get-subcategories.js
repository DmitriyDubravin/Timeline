const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    const {name, data} = req.body;
    const getSubcategoriesOptions = {
        user: name,
        category: data
    }

    const foundSubcategories = await f.tryCatch(f.getSubcategories(getSubcategoriesOptions));
    foundSubcategories.err && e.getSubcategoriesError(res);

    f.success(res, {
        data: foundSubcategories.data,
        dataName: 'subcategories'
    });

}