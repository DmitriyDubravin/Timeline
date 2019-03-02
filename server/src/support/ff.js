

const setStatus = status => res => res.status(status);

module.exports = {
    setStatus200: setStatus(200),
    setStatus201: setStatus(201),
    setStatus404: setStatus(404),
    setStatus500: setStatus(500),
    send: res => res.send()
};
