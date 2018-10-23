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
            removeEvent(userName, eventId) {
                return tryCatch(
                    queryServer({
                        path: paths.removeEvent,
                        data: {
                            name: userName,
                            _id: eventId
                        }
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
            }
        }
    }
    return instance;
})();

