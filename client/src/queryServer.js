import axios from "axios";
import {server} from "./support/constants";

export default ({path, data, callback, method = 'post'}) => {
    return axios[method](`${server}${path}`, data)
        .then(response => {
            if (!!callback) {
                callback(response.data);
            } else {
                return response.data;
            }
        })
        .catch(error => {
            console.log('%cError', 'color: red');
            console.log(error.response.data); // TODO! data leak to console
            // console.log(error);
        });
}
