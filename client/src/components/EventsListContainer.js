import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as action from './../store/actions';
// import paths from './../paths';
// import {withData, withQuery} from './../support/functions';
import EventsList from './EventsList';



// const con = connect(
//     state => ({
//         name: state.user.name,
//         date: state.date,
//         eventsListings: state.eventsListings
//     }),
//     dispatch => ({
//         addEventsList: function(date, eventsList) {
//             dispatch(action.addEventsList(date, eventsList))
//         }
//     })
// );

// const myCondition = props => !!props.eventsListings[props.date.date];
// const myQuery = props => ({
//     path: paths.getEventsList,
//     data: {
//         name: props.name,
//         start: props.date.rangeStart,
//         finish: props.date.rangeFinish,
//     },
//     sendConditions: [
//         prop => true
//     ],
//     resendConditions: [
//         (prev, now) => ['date'].every(prop => prev[prop] !== now[prop]),
//         (prev, now) => now.eventsListings[now.date.date] === undefined
//     ],
//     callback: cbData => props.addEventsList(props.date.date, cbData)
// });
// const withMyData = withData(myCondition);
// const withMyQuery = withQuery(myQuery);

// const EventsListContainer = ({eventsListings, date}) => {
//     const eventsList = eventsListings[date.date];
//     return <EventsList eventsListData={eventsList} />
// }

// export default con(withMyQuery(withMyData(EventsListContainer)));



function filterExistance(store, data) {
    let newData = Array.isArray(data) ? data : [data];
    store.forEach(storeEvent => {
        newData = newData.filter(dataEvent => dataEvent._id !== storeEvent._id)
    });
    if (newData.length === 1) {
        return newData[0];
    }
    return newData.length > 0 ? newData : null;
}

class EventsListContainer extends Component {
    componentDidMount() {
        // let data = [{_id: 1}, {_id: 2}];
        let data = {_id: 2};
        let newData = filterExistance(this.props.events, data);
        console.log(newData);
        newData && this.props.addEvent(newData);
    }
    render() {
        const eventsListData = [];
        return <EventsList eventsListData={eventsListData} />
    }
}

export default connect(
    state => ({
        user: state.user,
        events: state.events
    }),
    dispatch => ({
        addEvent(event) {
            dispatch(action.addEvent(event));
        },
        addEvents(events) {
            dispatch(action.addEvents(events));
        }

    })
)(EventsListContainer);

