import axios from "axios";
import {server} from "./support/constants";

export default ({path, data, callback}) => {
    return axios.post(`${server}${path}`, data)
        .then(response => {
            callback(response.data);
        })
        .catch(error => {
            console.log(error.response.data.message);
        });
}
