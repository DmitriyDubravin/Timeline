
const setShellStatus = (shell, status) => ({
    ...shell,
    body: {
        ...shell.body,
        status: status
    }
});

module.exports = {
    sendResponse: shell => shell.res.status(shell.body.status).send(shell.body),
    onSuccessStatus: status => shell => {
        if(!shell.success) return shell;
        return setShellStatus(shell, status);
    },
    onErrorStatus: status => shell => {
        if(shell.success) return shell;
        return setShellStatus(shell, status);
    },
    onErrorMessage: message => shell => {
        if(shell.success) return shell;
    
        return {
            ...shell,
            body: {
                ...shell.body,
                data: message
            }
        }
    },
    fireQuery: fn => async shell => {
        try {
            return ({
                ...shell,
                body: {
                    ...shell.body,
                    status: 200,
                    data: await fn(shell.query)
                }
            });
        } catch(error) {
            return ({
                ...shell,
                success: false,
                body: {
                    ...shell.body,
                    status: 500,
                    data: error
                }
            });
        }
    },
    setQuery: query => shell => ({...shell, query}),
    createShell: res => ({ res, success: true, body: {}}),
    log: data => {
        console.log('log:', data);
        return data;
    },
    composePromise: (...functions) => initialValue => functions.reduceRight(
        (sum, fn) => Promise.resolve(sum).then(fn),
        initialValue
    ),

    // TODO: to not forget
    tC: data => Promise.resolve(data).then(data => ({data})).catch(err => ({err})),
    tryCatch: promise => promise.then(data => ({data})).catch(err => ({err}))

};
