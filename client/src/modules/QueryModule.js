import queryServer from '../queryServer';
import paths from '../paths';
import {tryCatch} from '../support/functions';

export default (function() {
    var instance = null;
    if (!instance) {
        instance = {
            verifyToken(token) {
                return tryCatch(
                    queryServer({
                        path: paths.tokenAcknowledge,
                        data: {token: token}
                    })
                );
            },
        }
    }
    return instance;
})();

