import { checkCookie, getCookie, deleteCookie } from './support/cookies';

export default (function() {
    var instance = null;
    if (!instance) {
        instance = {
            token: undefined,
            checkToken() {
                return checkCookie('token');
            },
            getToken() {
                if (this.token === undefined) {
                    this.token = getCookie('token');
                }
                return this.token;
            },
            deleteToken() {
                this.token = false;
                deleteCookie('token');
            }
        }
    }
    return instance;
})();




// var userInstance = null;

// class UserModule {
//     constructor(props) {

//         this.token = undefined;

//         if (!userInstance) {
//             userInstance = this;
//         }
//         return userInstance;
//     }
//     checkToken() {
//         return checkCookie('token');
//     }
//     getToken() {
//         if (this.token === undefined) {
//             this.token = getCookie('token');
//         }
//         return this.token;
//     }
//     deleteToken() {
//         this.token = false;
//         deleteCookie('token');
//     }
// }

// export default new UserModule();