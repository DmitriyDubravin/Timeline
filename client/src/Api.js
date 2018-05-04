import fetch from 'isomorphic-fetch';

const server = 'http://localhost:8081'

export default (route, data) => {
    // let response;

    return fetch(`${server}${route}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    }).then(function(resp) {
        if (resp.status >= 400) {
            throw new Error("Bad response from server");
        }
        return resp.json();
    }).then(function(parsedResponse) {
        
        return parsedResponse;
    });

    // return response;
}