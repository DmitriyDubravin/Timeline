import React, { useState, useEffect } from 'react';
import EventsList from './../../components/EventsList';
import {
    extendEventWithHoursMinutes,
    removeEmptyKeys,
    checkEventModel,
    objectify,
    querify
} from './../../support/functions';
import { Input, Button } from './../forms';



const PageSearch = ({
    location: { search: queryLocation },
    user,
    events,
    ranges,
    search1,
    openPopupEventEdit,
    openPopupEventDelete
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
            search1(queryLocation);
        }
    }, [queryLocation, user]);

    const editEvent = id => {
        openPopupEventEdit(id);
    }
    const deleteEvent = id => {
        openPopupEventDelete(id);
    }



    const rangeIds = ranges[queryLocation];
    const eventsList = rangeIds === undefined
        ? []
        : rangeIds.map(id => {
            return extendEventWithHoursMinutes(checkEventModel(events[id]))
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
            <EventsList eventsListData={eventsList} editCb={editEvent} deleteCb={deleteEvent} />
        </div>
    );
}

export default PageSearch;
