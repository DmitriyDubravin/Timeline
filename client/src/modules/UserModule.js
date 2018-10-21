import {
    setCookie,
    checkCookie,
    getCookie,
    deleteCookie
} from './../support/cookies';
import * as action from './../store/actions';

export default (function() {
    var instance = null;
    if (!instance) {
        instance = {
            setToken(token) {
                setCookie(token);
            },
            checkToken() {
                return checkCookie('token');
            },
            getToken() {
                return getCookie('token');
            },
            deleteToken() {
                deleteCookie('token');
            },
            setUser(dispatch, name, token) {
                dispatch(action.setUser({
                    name: name,
                    token: token,
                    isAuthorized: true
                }))
            },
            unsetUser(dispatch) {
                dispatch(action.setUser({
                    name: false,
                    token: false,
                    isAuthorized: false
                }));
            },
        }
    }
    return instance;
})();
