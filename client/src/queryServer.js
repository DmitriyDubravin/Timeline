import axios from "axios";
import {server} from "./support/constants";

export default ({path, data, callback, method = 'post'}) => {
    return axios[method](`${server}${path}`, data)
        .then(response => {
            callback(response.data);
        })
        .catch(error => {
            console.log(error.response.data.message);
        });
}
