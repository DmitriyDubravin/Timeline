import React from 'react';
import {connect} from 'react-redux';
import * as action from './../store/actions';
import paths from './../paths';
import {withData, withQuery} from './../support/functions';
import EventsList from './EventsList';



const con = connect(
    state => ({
        name: state.user.name,
        date: state.date,
        eventsListings: state.eventsListings
    }),
    dispatch => ({
        addEventsList: function(date, eventsList) {
            dispatch(action.addEventsList(date, eventsList))
        }
    })
);

const myCondition = props => !!props.eventsListings[props.date.date];
const myQuery = props => ({
    path: paths.getEventsList,
    data: {
        name: props.name,
        start: props.date.rangeStart,
        finish: props.date.rangeFinish,
    },
    resendMarker: 'date'
});
const withMyData = withData(myCondition);
const withMyQuery = withQuery(myQuery);

const EventsListWrapper = ({eventsListings, date}) => {
    const eventsList = eventsListings[date.date];
    return <EventsList eventsList={eventsList} />
}

export default con(withMyQuery(withMyData(EventsListWrapper)));


