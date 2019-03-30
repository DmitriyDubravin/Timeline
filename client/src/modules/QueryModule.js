import queryServer from '../queryServer';
import paths from '../paths';

export default (function() {
    var instance = null;
    if (!instance) {
        instance = {
            userCreate(data) {
                return queryServer({
                    path: paths.userCreate,
                    data
                })
            },
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
            userPasswordUpdate(data) {
                return queryServer({
                    path: paths.userPasswordUpdate,
                    data
                })
            },
            userRemove(data) {
                return queryServer({
                    path: paths.userRemove,
                    data
                })
            },



            eventCreate(data) {
                return queryServer({
                    path: paths.eventCreate,
                    data
                })
            },
            eventUpdate(data) {
                return queryServer({
                    path: paths.eventUpdate,
                    data
                })
            },

            eventsGet(data) {
                return queryServer({
                    path: paths.eventsGet,
                    data
                });
            },
            usersGet(data) {
                return queryServer({
                    path: paths.usersGet,
                    data
                });
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
        }
    }
    return instance;
})();

