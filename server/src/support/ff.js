

const setStatus = status => res => res.status(status);
const setShellStatus = status => shell => ({...shell, status: status});

module.exports = {
    setShellStatus: setShellStatus,
    setShellStatus200: setStatus(200),
    setShellStatus201: setStatus(201),
    setShellStatus404: setStatus(404),
    setShellStatus500: setStatus(500),
    send: shell => shell.res.status(shell.status).send(shell.body)
};
