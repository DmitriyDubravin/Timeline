const f = require('./support/functions');
const e = require('./support/errors');
const F = require('./support/ff');
const log = data => {
    console.log('log:', data);
    return data;
}

const setShellStatus = status => shell => ({
    ...shell,
    status: status,
    body: {
        ...shell.body,
        status: status
    }
});
const send = shell => shell.res.status(shell.status).send(shell.body);

const composePromise = (...functions) =>
    initialValue =>
        functions.reduceRight(
            (sum, fn) => Promise.resolve(sum).then(fn),
            initialValue
    );

const getEventsErrorMessage = {message: '\nServer error while searching for events\n\n'};

const setShell = res => ({ res, success: true, body: {}});

const tC = fn => data => async shell => {
    try {
        return ({
            ...shell,
            status: 200,
            body: {
                ...shell.body,
                status: 200,
                data: await fn(data)
            }
        });
    } catch(error) {
        return ({
            ...shell,
            success: false,
            error: {
                ...shell.error,
                status: 500,
                message: error
            }
        });
    }
};

const onSuccess = status => {};
const onError = (message, status) => shell => {
    if(shell.success) return shell;

    return {
        ...shell,
        error: {
            message: message ? message : shell.error.message,
            status: status ? status : shell.error.status
        }
    }
};

module.exports = async function(req, res) {

    console.log('\n\n\nGET EVENTS LIST QUERY\n\n\n');

    const {author, start, finish} = req.body;
    const findEventsOptions = {
        user: author,
        start: {$gte: start},
        finish: {$lte: finish}
    }

    await composePromise(
        send,
        log,
        onError(getEventsErrorMessage),
        tC(f.findEvents)(findEventsOptions),
        setShell
    )(res);

}

/*
CONTRACT:
on success:

{
    status: Integer,
    data: Object, Array, String
}

*/


// const tryCatch = promise => promise.then(data => ({data})).catch(err => ({err}));

// const tC = data => Promise.resolve(data)
//     .then(data => ({data}))
//     .catch(err => ({err}));

// const extendShellBody = data => shell => ({
//     ...shell,
//     body: {
//         ...shell.body,
//         ...data
//     }});
