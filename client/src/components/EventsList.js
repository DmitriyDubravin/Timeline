import React, {Component} from 'react';
import {connect} from 'react-redux';
import queryServer from './../queryServer';
import {timestampToTimeObj} from './../support/functions';
import paths from './../paths';
import {Link} from 'react-router-dom';
import * as action from './../store/actions';

class EventsList extends Component {
    constructor(props) {
        super(props);

        this.handleServerResponse = this.handleServerResponse.bind(this);
    }
    handleServerResponse(response) {
        if (response.eventsList.length > 0) {
            this.props.addEventsList(this.convertDate(), response.eventsList);
        }
    }
    isHasList() {
        return !!this.props.eventsListings[this.convertDate()];
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
        let range = this.getRange(this.props.date, this.props.date);
        queryServer({
            path: paths.getEventsList,
            data: {
                name: this.props.name,
                ...range
            },
            callback: this.handleServerResponse
        });
    }
    getRange(start, finish) {
        let {day: sDay, month: sMonth, year: sYear} = start;
        let {day: fDay, month: fMonth, year: fYear} = finish;
        return {
            start: Math.floor(+new Date(Date.UTC(sYear, sMonth, sDay)) / 1000),
            finish: Math.floor(+new Date(Date.UTC(fYear, fMonth, fDay, 23, 59, 59)) / 1000)
        }
    }
    convertDate() {
        const {day, month, year} = this.props.date;
        return `${day}.${month}.${year}`;
    }
    render() {

        const eventsList = this.isHasList()
            ? this.props.eventsListings[this.convertDate()].map((event, i) => {

                const {hours: startHours, minutes: startMinutes} = timestampToTimeObj(event.start);
                const {hours: finishHours, minutes: finishMinutes} = timestampToTimeObj(event.finish);

                return (
                    <div key={i}>
                        {startHours}:{startMinutes} | {finishHours}:{finishMinutes} | 
                        {event.type} | 
                        {event.category} | 
                        {event.comment} | 
                        <Link to={`/chronometry/event/${event._id}`}>edit</Link>
                    </div>
                )
            })
            : [];

        return (
            this.isHasList() &&
            <div>
                {eventsList}
            </div>
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
