import queryServer from '../queryServer';
import paths from '../paths';

export default (function() {
    var instance = null;
    if (!instance) {
        instance = {
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
            verifyToken(data) {
                return queryServer({
                    path: paths.tokenAcknowledge,
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
                    path: paths.registerUser,
                    data
                })
            },
            loginUser(data) {
                return queryServer({
                    path: paths.loginUser,
                    data
                })
            },
            changeUserPassword(data) {
                return queryServer({
                    path: paths.changeUserPassword,
                    data
                })
            }
        }
    }
    return instance;
})();

