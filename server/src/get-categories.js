const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    const findUserNameOptions = {name: req.body.user}
    const getCategoriesOptions = {user: req.body.user, type: req.body.type}

    const foundUser = await f.tryCatch(f.findUser(findUserNameOptions));
    if (foundUser.err) e.findUserNameError(res);

    if (f.isUserFound(foundUser.data)) {

        const foundCategories = await f.tryCatch(f.getCategories(getCategoriesOptions));
        if (foundCategories.err) e.getCategoriesError(res);

        res.send({
            message: "Categories found",
            data: foundCategories.data
        })

    } else {
        res.send({
            message: "User not found"
        })
    }
}