const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    console.log('\n\n\nGET SUBCATEGORIES QUERY\n\n\n'); 
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