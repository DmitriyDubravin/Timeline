import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import queryServer from './../queryServer';
import paths from './../paths';
import * as action from './../store/actions';
import EventsList from './EventsList';



// const query = {
//     path: paths.getEventsList,
//     name: this.props.name,
//     start: this.props.date.rangeStart,
//     finish: this.props.date.rangeFinish,
// }
// 
// const WithQueryComponent = WithQuery(query);
// export default WithQueryComponent(EventsListWrapper);
// 
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
// 
// class EventsListWrapper extends Component {
//     constructor(props) {
//         super(props);
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
//     render() {
// 
//         const {eventsListings, date} = this.props;
//         const listing = eventsListings[date.date];
//         const eventsList = listing ? listing : null;
// 
//         return (
//             <Fragment>
//                 {eventsList && <EventsList eventsList={eventsList} />}
//             </Fragment>
//         )
//     }
// }



class EventsListWrapper extends Component {
    constructor(props) {
        super(props);
        this.handleServerResponse = this.handleServerResponse.bind(this);
    }
    handleServerResponse(response) {
        if (response.eventsList.length > 0) {
            this.props.addEventsList(this.props.date.date, response.eventsList);
        }
    }
    isHasList() {
        return !!this.props.eventsListings[this.props.date.date];
    }
    componentDidMount() {
        !this.isHasList() && this.getList();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.date !== this.props.date) {
            !this.isHasList() && this.getList();
        }
    }
    getList() {
        queryServer({
            path: paths.getEventsList,
            data: {
                name: this.props.name,
                start: this.props.date.rangeStart,
                finish: this.props.date.rangeFinish
            },
            callback: this.handleServerResponse
        });
    }
    render() {

        const {eventsListings, date} = this.props;
        const listing = eventsListings[date.date];
        const eventsList = listing ? listing : null;

        return (
            <Fragment>
                {eventsList && <EventsList eventsList={eventsList} />}
            </Fragment>
        )
    }
}



export default connect(
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
)(EventsListWrapper)
