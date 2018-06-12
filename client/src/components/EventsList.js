import React, {Component} from 'react';
import {connect} from 'react-redux';
import apiQuery from './../Api';

class EventsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventsList: null
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
        let range = this.getRange("01.04.2018", "01.04.2018");
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
        if (!this.state.eventsList) return null;

        const eventsList = this.state.eventsList.map((event, i) => {
            return (
                <div key={i}>
                    {event.type} | 
                    {event.category} | 
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
        name: state.user.name
    })
)(EventsList)
