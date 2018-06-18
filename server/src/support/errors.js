
module.exports = {

    findUserNameError: res => res.status(500).send({
        message: '\nServer error while searching for user by name\n\n'
    }),
    findUserTokenError: res => res.status(500).send({
        message: '\nServer error while searching for user by token\n\n'
    }),
    updateUserPasswordError: res => res.status(500).send({
        message: '\nServer error while updating user password\n\n'
    }),
    findUsersError: res => res.status(500).send({
        message: '\nServer error while searching for users\n\n'
    }),
    addUserError: res => res.status(500).send({
        message: '\nServer error while adding new user\n\n'
    }),
    removeUserError: res => res.status(500).send({
        message: '\nServer error while removing user\n\n'
    }),
    updateUserTokenError: res => res.status(500).send({
        message: '\nServer error while updating user token\n\n'
    }),
    findUserRoleError: res => res.status(500).send({
        message: '\nServer error while searching for email verification hash\n\n'
    }),
    updateUserRoleError: res => res.status(500).send({
        message: '\nServer error while updating users role\n\n'
    }),
    getTypesError: res => res.status(500).send({
        message: '\nServer error while searching for types\n\n'
    }),
    getCategoriesError: res => res.status(500).send({
        message: '\nServer error while searching for categories\n\n'
    }),
    getSubcategoriesError: res => res.status(500).send({
        message: '\nServer error while searching for subcategories\n\n'
    }),
    findEventsError: res => res.status(500).send({
        message: '\nServer error while searching for events\n\n'
    }),
    addEventError: res => res.status(500).send({
        message: '\nServer error while adding new event\n\n'
    }),
}
