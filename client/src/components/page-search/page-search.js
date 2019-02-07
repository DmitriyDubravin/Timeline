import React, { useState, useEffect } from 'react';
import EventsList from './../../components/EventsList';
import QS from 'query-string';
import {extendEventWithHoursMinutes, removeEmptyKeys, checkEventModel} from './../../support/functions';
import { Input, Button } from './../forms';



const PageSearch = ({
    location: { search },
    user,
    events,
    ranges,
    search1,
    openPopupEventEdit,
    openPopupEventDelete
}) => {

    const initial = {type: '', category: '', subcategory: '', comment: '', ...QS.parse(search)};

    const [ type, setType ] = useState(initial.type);
    const [ category, setCategory ] = useState(initial.category);
    const [ subcategory, setSubcategory ] = useState(initial.subcategory);
    const [ comment, setComment ] = useState(initial.comment);

    const queryObj = removeEmptyKeys({type, category, subcategory, comment});
    const sStr = QS.stringify(queryObj);
    const searchStr = sStr.length > 1 ? "?" + sStr : '';

    useEffect(() => {
        if (user.isAuthorized && search.length > 0) {
            search1(search, queryObj);
        }
    }, [search, user]);

    const editEvent = id => {
        openPopupEventEdit(id);
    }
    const deleteEvent = id => {
        openPopupEventDelete(id);
    }



    const rangeIds = ranges[search];
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
                        search: searchStr
                    }}
                />
            </form>
            <EventsList eventsListData={eventsList} editCb={editEvent} deleteCb={deleteEvent} />
        </div>
    );
}

export default PageSearch;
