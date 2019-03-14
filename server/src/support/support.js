
// const shell = {
//     res: res,
//     error: false,
//     body: {}
// };

module.exports = {

    skipIfError: shell => {
        if (shell.error) return shell;
    },

    sendResponse: shell => shell.res.status(shell.body.status).send(shell.body),
    onSuccessStatus: status => shell => {
        if (shell.error) return shell;
        return {
            ...shell,
            body: {
                ...shell.body,
                status: status
            }
        };
    },
    onErrorStatus: status => shell => {
        if (!shell.error) return shell;
        return {
            ...shell,
            body: {
                ...shell.body,
                status: status
            }
        };
    },
    onErrorMessage: message => shell => {
        if(!shell.error) return shell;
        return {
            ...shell,
            body: {
                ...shell.body,
                data: message
            }
        }
    },
    fireQuery: fn => async shell => {
        if (shell.error) return shell;
        // TODO: check for 'query' existance
        try {
            return ({
                ...shell,
                error: false,
                body: {
                    ...shell.body,
                    status: 200,
                    data: await fn(shell.query)
                }
            });
        } catch(error) {
            return ({
                ...shell,
                error: true,
                body: {
                    ...shell.body,
                    status: 500,
                    data: error
                }
            });
        }
    },
    setQuery: query => shell => {
        if (shell.error) return shell;
        return {...shell, query}
    },
    createShell: res => ({ res, error: false, body: {}}),
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
