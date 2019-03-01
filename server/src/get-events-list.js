const f = require('./support/functions');
const e = require('./support/errors');

const composePromise = (...functions) =>
    initialValue =>
        functions.reduceRight(
            (sum, fn) => Promise.resolve(sum).then(fn),
            initialValue
    );

const tryCatch = promise => {
    console.log('sss', promise);
    return promise.then(data => ({data}))
    .catch(err => ({err}));
}

const tC = data => Promise.resolve(data)
    .then(data => ({data}))
    .catch(err => ({err}));

const log = data => {
    console.log('log:', data);
    return data;
}

module.exports = async function(req, res) {

    

    console.log('\n\n\nGET EVENTS LIST QUERY\n\n\n');

    const {author, start, finish} = req.body;
    const findEventsOptions = {
        user: author,
        start: {$gte: start},
        finish: {$lte: finish}
    }

    const {data, err } = await composePromise(
        tC,
        f.findEvents,
    )(findEventsOptions);

    console.log(data);


    // const {data, err} = await f.tryCatch(f.findEvents(findEventsOptions));
    // err && e.findEventsError(res);

    f.success(res, {eventsList: data});

}