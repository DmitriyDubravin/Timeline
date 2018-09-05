import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import queryServer from './../queryServer';
import paths from './../paths';
import * as action from './../store/actions';
import EventsList from './EventsList';





// const WithQueryComponent = WithQuery(query);

// const WithQuery = query => Component => props => class extends React.Component {
//     constructor(props) {
//         super(props);
//         this.handleServerResponse = this.handleServerResponse.bind(this);
//     }
//     handleServerResponse(response) {
//         if (response.eventsList.length > 0) {
//             this.props.addEventsList(this.props.date.date, response.eventsList);
//         }
//     }
//     getList() {
//         queryServer({
//             path: query.path,
//             data: {
//                 name: query.name,
//                 start: query.start,
//                 finish: query.finish
//             },
//             callback: this.handleServerResponse
//         });
//     }
//     render() {
//         return <Component {...props} />
//     }
// }

// const withLoad = Component => class extends React.Component {
//     constructor(props) {
//         super(props);
//         this.handleServerResponse = this.handleServerResponse.bind(this);
//     }
//     handleServerResponse(response) {
//         this.props.addEventsList(this.props.date.date, response.eventsList);
//     }
//     componentDidMount() {
//         this.getList();
//     }
//     getList() {
//         queryServer({
//             path: paths.getEventsList,
//             data: {
//                 name: this.props.name,
//                 start: this.props.date.rangeStart,
//                 finish: this.props.date.rangeFinish
//             },
//             callback: this.handleServerResponse
//         });
//     }
//     render() {
//         return <Component />
//     }
// }



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

const withData = Component => props => {
    let condition = props.eventsListings[props.date.date];
    console.log(0, props);
    // condition = true;

    // const query = {
    //     path: paths.getEventsList,
    //     name: props.name,
    //     start: props.date.rangeStart,
    //     finish: props.date.rangeFinish,
    // }

    return condition ? <Component {...props} /> : null;
}

class EventsListWrapper extends Component {
    render() {
        console.log(1, this.props);
        const {eventsListings, date} = this.props;
        const eventsList = eventsListings[date.date];
        return <EventsList eventsList={eventsList} />
    }
}

export default con(withData(EventsListWrapper));



// class EventsListWrapper extends Component {
//     constructor(props) {
//         super(props);
//         this.handleServerResponse = this.handleServerResponse.bind(this);
//     }
//     handleServerResponse(response) {
//         if (response.eventsList.length > 0) {
//             this.props.addEventsList(this.props.date.date, response.eventsList);
//         }
//     }
//     isHasList() {
//         return !!this.props.eventsListings[this.props.date.date];
//     }
//     componentDidMount() {
//         !this.isHasList() && this.getList();
//     }
//     componentDidUpdate(prevProps) {
//         if (prevProps.date !== this.props.date) {
//             !this.isHasList() && this.getList();
//         }
//     }
//     getList() {
//         queryServer({
//             path: paths.getEventsList,
//             data: {
//                 name: this.props.name,
//                 start: this.props.date.rangeStart,
//                 finish: this.props.date.rangeFinish
//             },
//             callback: this.handleServerResponse
//         });
//     }
//     render() {

//         const {eventsListings, date} = this.props;
//         const listing = eventsListings[date.date];
//         const eventsList = listing ? listing : null;

//         return (
//             <Fragment>
//                 {eventsList && <EventsList eventsList={eventsList} />}
//             </Fragment>
//         )
//     }
// }



// export default connect(
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
// )(EventsListWrapper)
