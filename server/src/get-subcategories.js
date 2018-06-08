const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    const findUserNameOptions = {name: req.body.user}
    const getSubcategoriesOptions = {user: req.body.user, category: req.body.category}

    const foundUser = await f.tryCatch(f.findUser(findUserNameOptions));
    if (foundUser.err) e.findUserNameError(res);

    if (f.isUserFound(foundUser.data)) {

        const foundSubcategories = await f.tryCatch(f.getSubcategories(getSubcategoriesOptions));
        if (foundSubcategories.err) e.getSubcategoriesError(res);

        res.send({
            message: "Subcategories found",
            data: foundSubcategories.data
        })

    } else {
        res.send({
            message: "User not found"
        })
    }
}