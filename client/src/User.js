import { checkCookie, getCookie, deleteCookie } from './support/cookies';
var userInstance = null;

export default class UserModule {
    constructor(props) {

        this.token = undefined;

        if (!userInstance) {
            userInstance = this;
        }
        return userInstance;
    }
    checkToken() {
        return !!checkCookie('token');
    }
    getToken() {
        if (this.token === undefined) {
            this.token = getCookie('token');
        }
        return this.token;
    }
    deleteToken() {
        this.token = false;
        deleteCookie('token');
    }
}