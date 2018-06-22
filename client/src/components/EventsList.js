import React, {Component} from 'react';
import {connect} from 'react-redux';
import apiQuery from './../Api';
import {timestampToTimeObj} from './../support/functions';

class EventsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventsList: []
        }

        this.serverResponse = this.serverResponse.bind(this);
    }
    serverResponse(response) {

        let eventsList = response.eventsList.length > 0 
            ? response.eventsList
            : null;
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
        apiQuery({
            path: '/events-list',
            data: {
                name: this.props.name,
                ...range
            },
            callback: this.serverResponse
        });
    }
    getRange(start, finish) {
        let [sDay, sMonth, sYear] = start.split('.');
        let [fDay, fMonth, fYear] = finish.split('.');
        return {
            start: Math.floor(+new Date(Date.UTC(sYear, --sMonth, sDay)) / 1000),
            finish: Math.floor(+new Date(Date.UTC(fYear, --fMonth, fDay, 23, 59, 59)) / 1000)
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
        date: state.date.date
    })
)(EventsList)
