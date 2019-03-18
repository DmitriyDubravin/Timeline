const f = require('./functions');

// const shell = {
//     res: Object,
//     error: Boolean,
//     query: Object
//     body: {
//         status: Int,
//         data: Any
//     }
// };

const setError = shell => ({...shell, error: true});
const setToBody = dataObj => shell => ({...shell, body: {...shell.body, ...dataObj}});
const setStatus = status => shell => ({...shell, status});
const setData = data => shell => ({...shell, data});

module.exports = {

    setError,
    setStatus,
    setData,

    sendResponse: shell => {
        const { res, status, data } = shell;
        return res.status(status).send({status, data});
    },

    skipIfError: fn => shell => {
        if (shell.error) return shell;
        return fn(shell);
    },

    setResponse: data => shell => {
        if (shell.error) return shell;
        return setData(data)(shell);
    },
    onSuccessStatus: status => shell => {
        return setToBody({status})(shell);
    },
    onErrorStatus: status => shell => {
        if (!shell.error) return shell;
        return setToBody({status})(shell);
    },
    onErrorMessage: data => shell => {
        if(!shell.error) return shell;
        return setToBody({data})(shell);
    },
    query: fn => async shell => {
        // TODO: check for 'query' existance
        try {
            return ({
                ...shell,
                error: false,
                body: {
                    ...shell.body,
                    status: 200,
                    data: await fn(...shell.query)
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
    fireQuery: fn => async shell => {
        // TODO: check for 'query' existance
        try {
            return ({
                ...shell,
                error: false,
                body: {
                    ...shell.body,
                    status: 200,
                    data: await fn(...shell.query)
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
    setQuery: (...query) => shell => {
        return {...shell, query}
    },
    createShell: res => ({ res }),
    log: data => {
        const { res, ...rest } = data;
        console.log('log:', rest);
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
