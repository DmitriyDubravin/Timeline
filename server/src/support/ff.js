

const setShellStatus = status => shell => ({...shell, status: status});

module.exports = {
    setShellStatus: setShellStatus,
    send: shell => shell.res.status(shell.status).send(shell.body)
};
