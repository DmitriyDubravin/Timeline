import fetch from 'isomorphic-fetch';

const server = 'http://localhost:8081'

export default ({path, data, callback}) => {
    console.log('query were send!')
    return fetch(`${server}${path}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    }).then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    }).then(function(parsedResponse) {
        callback(parsedResponse)
    });
}