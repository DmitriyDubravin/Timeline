import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as action from './../store/actions';
import queryServer from './../queryServer';
import paths from './../paths';
// import {withData, withQuery} from './../support/functions';
import EventsList from './EventsList';


class EventsListContainer extends Component {
    constructor(props) {
        super(props);
        this.handleServerResponse = this.handleServerResponse.bind(this);
        this.editEvent = this.editEvent.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
    }

    componentDidMount() {
        this.getEventsList();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.date !== this.props.date) {
            const {date: {date}, dates} = this.props;
            if (dates[date] === undefined) {
                this.getEventsList();
            }
        }
    }

    getEventsList() {
        const {user, date} = this.props;
        queryServer({
            path: paths.getEventsList,
            data: {
                name: user.name,
                start: date.rangeStart,
                finish: date.rangeFinish,
            },
            callback: this.handleServerResponse
        });
    }

    handleServerResponse(response) {
        const date = this.props.date.date;
        const events = {};
        response.data.forEach(event => {
            events[event._id] = event;
        });
        this.props.addDateEvents(date, events);
    }

    editEvent(id) {
        console.log(id);
    }

    deleteEvent(id) {
        console.log(id);
    }

    render() {
        const {date: {date}, dates, events} = this.props;
        const dateIds = dates[date];
        const dateEventsList = dateIds === undefined
            ? []
            : dateIds.map(id => events[id]);

        return <EventsList eventsListData={dateEventsList} editCb={this.editEvent} deleteCb={this.deleteEvent} />
    }
}

export default connect(
    state => ({
        user: state.user,
        date: state.date,
        events: state.eventsData.events,
        dates: state.eventsData.ranges.dates
    }),
    dispatch => ({
        addEvent(event) {
            dispatch(action.addEvent(event));
        },
        addDateEvents(date, events) {
            dispatch(action.addDateEvents(date, events));
        },
        togglePopupEditEvent: function(boolean) {
            dispatch(action.togglePopupEditEvent(boolean))
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

