import queryServer from '../queryServer';
import paths from '../paths';

export default (function() {
    var instance = null;
    if (!instance) {
        instance = {
            userTokenCheck(data) {
                return queryServer({
                    path: paths.userTokenCheck,
                    data
                })
            },
            userLogin(data) {
                return queryServer({
                    path: paths.userLogin,
                    data
                })
            },
            changeUserPassword(data) {
                return queryServer({
                    path: paths.userPasswordUpdate,
                    data
                })
            },



            getTypes(data) {
                return queryServer({
                    path: paths.getTypes,
                    data
                });
            },
            getCategories(data) {
                return queryServer({
                    path: paths.getCategories,
                    data
                })
            },
            getSubcategories(data) {
                return queryServer({
                    path: paths.getSubcategories,
                    data
                })
            },
            getEvents(data) {
                return queryServer({
                    path: paths.getEventsList,
                    data
                });
            },
            addEvent(data) {
                return queryServer({
                    path: paths.addEvent,
                    data
                })
            },
            editEvent(data) {
                return queryServer({
                    path: paths.editEvent,
                    data
                })
            },
            removeEvent(data) {
                return queryServer({
                    path: paths.removeEvent,
                    data
                })
            },
            search(query, data) {
                return queryServer({
                    path: paths.search + '' + query,
                    data
                })
            },
            getUsers(data) {
                return queryServer({
                    path: paths.getUsersList,
                    data: {}
                });
            },
            confirmEmail(data) {
                return queryServer({
                    path: paths.emailConfirmation,
                    data
                })
            },
            deleteUser(data) {
                return queryServer({
                    path: paths.deleteUser,
                    data
                })
            },
            registerUser(data) {
                return queryServer({
                    path: paths.userCreate,
                    data
                })
            },
        }
    }
    return instance;
})();

