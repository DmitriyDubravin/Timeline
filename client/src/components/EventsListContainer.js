import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as action from './../store/actions';
import queryServer from './../queryServer';
import paths from './../paths';
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



class EventsListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
        // this.getEventsList = this.getEventsList.bind(this);
        this.handleServerResponse = this.handleServerResponse.bind(this);
    }
    componentDidMount() {
        this.getEventsList();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.date !== this.props.date) {
            this.getEventsList();
        }
    }
    getEventsList() {
        queryServer({
            path: paths.getEventsList,
            data: {
                name: this.props.user.name,
                start: this.props.date.rangeStart,
                finish: this.props.date.rangeFinish,
            },
            callback: this.handleServerResponse
        });
    }
    handleServerResponse(response) {
        this.setState({events: response.data});

        let d = {};
        let dayContents = [];

        response.data.forEach(event => {
            d[event._id] = event;
            dayContents.push(event._id);
        });
        console.log(this.props.date.date, dayContents);

        this.props.addEvents(d);




    }
    render() {
        return <EventsList eventsListData={this.state.events} />
    }
}

export default connect(
    state => ({
        user: state.user,
        date: state.date,
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

