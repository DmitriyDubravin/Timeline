import axios from 'axios';

const server = 'http://localhost:8081'

export default ({path, data, callback}) => {
    return axios.post(`${server}${path}`, data)
        .then(response => {
            // console.log(response.data);
            callback(response.data);
        })
        .catch(error => {
            console.log(error.response.data.message);
        });
}

