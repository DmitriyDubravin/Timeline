import queryServer from '../queryServer';
import paths from '../paths';
import {tryCatch} from '../support/functions';

export default (function() {
    var instance = null;
    if (!instance) {
        instance = {
            getTypes(data) {
                return tryCatch(
                    queryServer({
                        path: paths.getTypes,
                        data: data
                    })
                );
            },
            getCategories(data) {
                return tryCatch(
                    queryServer({
                        path: paths.getCategories,
                        data: data
                    })
                );
            },
            getSubcategories(data) {
                return tryCatch(
                    queryServer({
                        path: paths.getSubcategories,
                        data: data
                    })
                );
            },
            verifyToken(data) {
                return tryCatch(
                    queryServer({
                        path: paths.tokenAcknowledge,
                        data: data
                    })
                );
            },
            getEvents(data) {
                return tryCatch(
                    queryServer({
                        path: paths.getEventsList,
                        data: data
                    })
                );
            },
            addEvent(data) {
                return tryCatch(
                    queryServer({
                        path: paths.addEvent,
                        data: data
                    })
                );
            },
            editEvent(data) {
                return tryCatch(
                    queryServer({
                        path: paths.editEvent,
                        data: data
                    })
                );
            },
            removeEvent(data) {
                return tryCatch(
                    queryServer({
                        path: paths.removeEvent,
                        data: data
                    })
                );
            },
            search(query, data) {
                return tryCatch(
                    queryServer({
                        path: paths.search + '' + query,
                        data: data
                    })
                );
            },
            confirmEmail(data) {
                return tryCatch(
                    queryServer({
                        path: paths.emailConfirmation,
                        data: data
                    })
                );
            },
            deleteUser(data) {
                return tryCatch(
                    queryServer({
                        path: paths.deleteUser,
                        data: data
                    })
                );
            },
            registerUser(data) {
                return tryCatch(
                    queryServer({
                        path: paths.registerUser,
                        data: data
                    })
                );
            },
            loginUser(data) {
                return tryCatch(
                    queryServer({
                        path: paths.loginUser,
                        data: data
                    })
                );
            },
            changeUserPassword(data) {
                return tryCatch(
                    queryServer({
                        path: paths.changeUserPassword,
                        data: data
                    })
                );
            }
        }
    }
    return instance;
})();

