import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import EventsList from './../../components/EventsList';
import QM from './../../modules/QueryModule';
import QS from 'query-string';
import {extendEventWithHoursMinutes, removeEmptyKeys, checkEventModel} from './../../support/functions';
import { Input, Button } from './../forms';



const PageSearch = ({
    location: { search },
    name,
    events,
    ranges,
    addRangeEvents,
    openPopupEventEdit,
    openPopupEventDelete
}) => {

    const [ type, setType ] = useState('');
    const [ category, setCategory ] = useState('');
    const [ subcategory, setSubcategory ] = useState('');
    const [ comment, setComment ] = useState('');

    const queryObjTemplate = {type, category, subcategory, comment};

    const queryObj = {...queryObjTemplate, ...QS.parse(search)};
    this.state = {queryObj, search};

    useEffect(() => {
        if (isSearchString()) {
            search1();
        }
    }, [search]);

    async function search1() {
        const queryData = {
            author: name,
            queries: removeEmptyKeys(queryObj)
        };
        const {success, eventsList} = await QM.search(search, queryData);
        if (success) {
            const events = {};
            eventsList.forEach(event => {
                events[event._id] = event;
            });
            addRangeEvents(search, events);
        }
    }

    function submitHandler(event) {
        const {name, value} = event.target;
    }

    function inputHandler() {
        // const queryObj = {queryObj, [name]: value};
        const string = QS.stringify(removeEmptyKeys(queryObj));
        const s = string.length > 1 ? "?" + string : '';
        this.setState({queryObj, s});
    }

    function isSearchString() {
        return search.length > 0
    }

    function editEvent(id) {
        openPopupEventEdit(id);
    }
    function deleteEvent(id) {
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
            <form className="search-form" onSubmit={submitHandler}>
                <div className="line">
                    <Input
                        placeholder="Type"
                        value={type}
                        onChange={setType}
                    />
                </div>
                <div className="line">
                    <Input
                        placeholder="Category"
                        value={category}
                        onChange={setCategory}
                    />
                </div>
                <div className="line">
                    <Input
                        placeholder="Subcategory"
                        value={subcategory}
                        onChange={setSubcategory}
                    />
                </div>
                <div className="line">
                    <Input
                        placeholder="Comment"
                        value={comment}
                        onChange={setComment}
                    />
                </div>
                <Button
                    className="button"
                    to={{
                        pathname: "/search",
                        search: search
                    }}
                />
            </form>
            <EventsList eventsListData={eventsList} editCb={editEvent} deleteCb={deleteEvent} />
        </div>
    );
}

export default PageSearch;
