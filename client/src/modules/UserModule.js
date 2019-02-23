import {
    setCookie,
    checkCookie,
    getCookie,
    deleteCookie
} from 'support/cookies';

export default (function() {
    var instance = null;
    if (!instance) {
        instance = {
            setToken(payload) {
                setCookie('token', payload);
            },
            checkToken() {
                return checkCookie('token');
            },
            getToken() {
                return getCookie('token');
            },
            deleteToken() {
                deleteCookie('token');
            }
        }
    }
    return instance;
})();
