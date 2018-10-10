const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    const {name, data} = req.body;
    const getCategoriesOptions = {
        user: name,
        type: data
    };

    const foundCategories = await f.tryCatch(f.getCategories(getCategoriesOptions));
    foundCategories.err && e.getCategoriesError(res);

    f.success(res, {
        data: foundCategories.data,
        dataName: 'categories'
    });

}