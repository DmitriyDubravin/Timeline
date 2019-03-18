import axios from "axios";
import {server} from "./support/constants";

export default ({path, data, callback, method = 'post'}) => {
    return axios[method](`${server}${path}`, data)
        .then(response => {
            // TODO: ?
            if (!!callback) {
                callback(response.data);
            } else {
                return response.data;
            }
        })
        .catch(error => {
            if (!!callback) {
                callback(error.response.data);
            } else {
                return error.response.data;
            }
            // console.log('%cError', 'color: red');
            // console.log(error.response.data); // TODO! data leak to console
            // console.log(error);
        });
}

/*

RESPONSE CONTRACT:

{
    status: Integer,
    data: Object, Array, String
}

*/
