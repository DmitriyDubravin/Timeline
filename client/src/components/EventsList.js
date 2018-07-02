import React, {Component} from 'react';
import {connect} from 'react-redux';
import queryServer from './../queryServer';
import {timestampToTimeObj} from './../support/functions';
import paths from './../paths';

class EventsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventsList: []
        }

        this.handleServerResponse = this.handleServerResponse.bind(this);
    }
    handleServerResponse(response) {

        let eventsList = response.eventsList.length > 0 
            ? response.eventsList
            : [];
        this.setState({eventsList: eventsList})
    }
    componentDidMount() {
        this.getList();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.date !== this.props.date) {
            this.getList();
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
    render() {

        const eventsList = this.state.eventsList.map((event, i) => {

            const {hours: startHours, minutes: startMinutes} = timestampToTimeObj(event.start);
            const {hours: finishHours, minutes: finishMinutes} = timestampToTimeObj(event.finish);

            return (
                <div key={i}>
                    {startHours}:{startMinutes} | {finishHours}:{finishMinutes} |
                    {event.type} | 
                    {event.category} | 
                    {/* {event.comment} |  */}
                </div>
            )
        });

        return (
            this.state.eventsList &&
            <div>
                {eventsList}
            </div>
        )
    }
}


export default connect(
    state => ({
        name: state.user.name,
        date: state.date
    })
)(EventsList)
