import React, { useState, useEffect } from 'react';
import EventsList from 'components/events-list';
import {
    removeEmptyKeys,
    checkEventModel,
    objectify,
    querify
} from 'support/functions';
import { Input, Button } from 'components/forms';



const PageSearch = ({
    location: { search: queryLocation },
    user,
    events,
    ranges,
    search
}) => {

    const initial = {type: '', category: '', subcategory: '', comment: '', ...objectify(queryLocation)};

    const [ type, setType ] = useState(initial.type);
    const [ category, setCategory ] = useState(initial.category);
    const [ subcategory, setSubcategory ] = useState(initial.subcategory);
    const [ comment, setComment ] = useState(initial.comment);

    const queryObj = removeEmptyKeys({type, category, subcategory, comment});
    const queryStr = querify(queryObj);


    useEffect(() => {
        // TODO: remove user
        if (user.isAuthorized && queryLocation.length > 0) {
            search({query: queryLocation});
        }
    }, [queryLocation, user]);


    // generalize approach (with page-chronometry)
    const rangeIds = ranges[queryLocation];
    const eventsList = rangeIds === undefined
        ? []
        : rangeIds.map(id => {
            return checkEventModel(events[id])
        });

    return (
        <div>
            <h2>Search Page</h2>
            <form className="search-form">
                <Input
                    placeholder="Type"
                    value={type}
                    onChange={setType}
                />
                <Input
                    placeholder="Category"
                    value={category}
                    onChange={setCategory}
                />
                <Input
                    placeholder="Subcategory"
                    value={subcategory}
                    onChange={setSubcategory}
                />
                <Input
                    placeholder="Comment"
                    value={comment}
                    onChange={setComment}
                />
                <Button
                    value="Search"
                    type="link"
                    to={{
                        pathname: "/search",
                        search: queryStr
                    }}
                />
            </form>
            <EventsList eventsList={eventsList} />
        </div>
    );
}

export default PageSearch;
