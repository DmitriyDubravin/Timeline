import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import * as action from './../store/actions';
import EventsList from './EventsList';
import {extendEventWithHoursMinutes} from './../support/functions';


const EventsListContainer = ({date, ranges, events, getEvents}) => {

    useEffect(() => {
        if (ranges[date.dateStr] === undefined) {
            getEvents();
        }
    }, [date]);

    const editEvent = id => {
        this.props.togglePopupEditEvent(true, id);
    }

    const removeEvent = id => {
        this.props.togglePopupEventRemove(true, id);
    }

    const rangeIds = ranges[date.dateStr];
    const eventsList = rangeIds === undefined
        ? []
        // TODO: remove to connector
        : rangeIds.map(id => extendEventWithHoursMinutes(events[id]));

    return <EventsList eventsListData={eventsList} editCb={editEvent} removeCb={removeEvent} />
}

export default connect(
    state => ({
        name: state.user.name,
        date: state.date,
        events: state.eventsData.events,
        ranges: state.eventsData.ranges
    }),
    dispatch => ({
        dispatch,
        togglePopupEditEvent: function(boolean, id) {
            dispatch(action.togglePopupEditEvent(boolean, id))
        },
        togglePopupEventRemove: function(boolean, id) {
            dispatch(action.togglePopupEventRemove(boolean, id))
        },
        // test() {
        //     dispatch(action.action())
        // },
        getEvents(data) {
            dispatch(action.getEvents(data));
        }
    })
)(EventsListContainer);
