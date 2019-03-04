const f = require('./support/functions');
const e = require('./support/errors');
const F = require('./support/ff');

const { send, setShellStatus } = F;

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

const tC = (onSuccess, onError) => data => shell => Promise.resolve(data)
    .then(data => onSuccess(data))
    .catch(err => onError(err));

const log = data => {
    console.log('log:', data);
    return data;
}

const getEventsErrorMessage = {message: '\nServer error while searching for events\n\n'};
const extendShellBody = data => shell => ({ ...shell, body: { ...shell.body, ...data } });
const setShell = res => ({res, body: {}});


module.exports = async function(req, res) {

    console.log('\n\n\nGET EVENTS LIST QUERY\n\n\n');

    const sendSuccess = composePromise(
        send,
        extendShellBody({test: 'test'}),
        setShellStatus(200)
    );

    const sendError = composePromise(
        send,
        extendShellBody(getEventsErrorMessage),
        setShellStatus(500)
    );

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


    // const {data, err} = await f.tryCatch(f.findEvents(findEventsOptions));
    // err && e.findEventsError(res);

    f.success(res, {eventsList: data});

}