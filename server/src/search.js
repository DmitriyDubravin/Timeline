const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    console.log('\n\n\nNEW SEARCH QUERY\n\n\n');

    const {body: {author}, query} = req;
    const searchOptions = {
        user: author
    };

    for (var key in query) {
        if (query.hasOwnProperty(key) && !!query[key]) {
            searchOptions[key] = {$regex: query[key], $options: "i"};
        }
    }

    const foundSearch = await f.tryCatch(f.search(searchOptions));
    foundSearch.err && e.searchError(res);

    f.success(res, {
        data: foundSearch.data
    });

}