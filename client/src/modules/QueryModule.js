import queryServer from '../queryServer';
import paths from '../paths';
import {tryCatch} from '../support/functions';

export default (function() {
    var instance = null;
    if (!instance) {
        instance = {
            getData(path, name, data = '') {
                return tryCatch(
                    queryServer({
                        path: path,
                        data: {name, data}
                    })
                );
            },
            verifyToken(token) {
                return tryCatch(
                    queryServer({
                        path: paths.tokenAcknowledge,
                        data: {
                            token: token
                        }
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
            }
        }
    }
    return instance;
})();

