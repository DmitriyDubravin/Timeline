import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import queryServer from './../queryServer';
import paths from './../paths';
// import {Link} from 'react-router-dom';
import * as action from './../store/actions';
import Event from './Event';

class EventsList extends Component {
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
        const eventsList = listing
            ? listing.map(eventData => <Event key={eventData._id} {...eventData} /> )
            : null;

        return (
            <Fragment>
                {eventsList}
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
)(EventsList)
