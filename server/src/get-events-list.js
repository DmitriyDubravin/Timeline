const f = require('./support/functions');
const e = require('./support/errors');
const F = require('./support/ff');

const setShellStatus = status => shell => ({
    ...shell,
    status: status,
    body: {
        ...shell.body,
        status: status
    }
});
const send = shell => shell.res.status(shell.status).send(shell.body)

const composePromise = (...functions) =>
    initialValue =>
        functions.reduceRight(
            (sum, fn) => Promise.resolve(sum).then(fn),
            initialValue
    );

const tryCatch = promise => promise.then(data => ({data})).catch(err => ({err}));

// const tC = data => Promise.resolve(data)
//     .then(data => ({data}))
//     .catch(err => ({err}));

const log = data => {
    console.log('log:', data);
    return data;
}

const getEventsErrorMessage = {message: '\nServer error while searching for events\n\n'};

const extendShellBody = data => shell => ({
    ...shell,
    body: {
        ...shell.body,
        ...data
    }});
const setShell = res => ({ res, body: {}});


const tC = (onSuccess, onError) => data => async shell => {
    try {
        onSuccess({
            ...shell,
            body: {
                ...shell.body,
                response: {eventsList: await Promise.resolve(data)}
            }
        });
    } catch(error) {
        onError({...shell, body: getEventsErrorMessage});
    }
}
const sendSuccess = composePromise(
    send,
    setShellStatus(200)
);

const sendError = composePromise(
    send,
    setShellStatus(500)
);


module.exports = async function(req, res) {

    console.log('\n\n\nGET EVENTS LIST QUERY\n\n\n');

    const {author, start, finish} = req.body;
    const findEventsOptions = {
        user: author,
        start: {$gte: start},
        finish: {$lte: finish}
    }

    await composePromise(
        tC(sendSuccess, sendError)(f.findEvents(findEventsOptions)),
        setShell
    )(res);

}