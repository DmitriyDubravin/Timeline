import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as action from './../store/actions';
import EventsList from './EventsList';
import {extendEventWithHoursMinutes} from './../support/functions';
import QM from './../modules/QueryModule';


class EventsListContainer extends Component {
    constructor(props) {
        super(props);
        this.editEvent = this.editEvent.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
    }

    componentDidMount() {
        this.getEventsList();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.date !== this.props.date) {
            const {date: {date}, ranges} = this.props;
            if (ranges[date] === undefined) {
                this.getEventsList();
            }
        }
    }

    async getEventsList() {

        const {date: {date: range, rangeStart, rangeFinish}, name} = this.props;
        const queryData = {
            author: name,
            start: rangeStart,
            finish: rangeFinish
        };

        const {success, eventsList} = await QM.getEvents(queryData);
        if (success) {
            const events = {};
            eventsList.forEach(event => {
                events[event._id] = event;
            });
            this.props.addRangeEvents(range, events);
        }
    }

    editEvent(id) {
        this.props.togglePopupEditEvent(true, id);
    }

    deleteEvent(id) {
        this.props.togglePopupDeleteEvent(true, id);
    }

    render() {

        const {ranges, events, date: {date}} = this.props;
        const rangeIds = ranges[date];
        const eventsList = rangeIds === undefined
            ? []
            : rangeIds.map(id => extendEventWithHoursMinutes(events[id]));

        return <EventsList eventsListData={eventsList} editCb={this.editEvent} deleteCb={this.deleteEvent} />
    }
}

export default connect(
    state => ({
        name: state.user.name,
        date: state.date,
        events: state.eventsData.events,
        ranges: state.eventsData.ranges
    }),
    dispatch => ({
        addRangeEvents(range, events) {
            dispatch(action.addRangeEvents(range, events));
        },
        togglePopupEditEvent: function(boolean, id) {
            dispatch(action.togglePopupEditEvent(boolean, id))
        },
        togglePopupDeleteEvent: function(boolean, id) {
            dispatch(action.togglePopupDeleteEvent(boolean, id))
        },
    })
)(EventsListContainer);



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

