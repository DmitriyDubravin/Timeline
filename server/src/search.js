const f = require('./support/functions');
const e = require('./support/errors');

module.exports = async function(req, res) {

    console.log('\n\n\nNEW SEARCH QUERY\n\n\n');

    const {name, query} = req.body;
    const searchOptions = {
        user: name,
        comment: {$regex: new RegExp(query)}
    };

    const foundSearch = await f.tryCatch(f.search(searchOptions));
    foundSearch.err && e.searchError(res);

    f.success(res, {
        data: foundSearch.data
    });

}