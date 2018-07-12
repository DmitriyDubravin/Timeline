import React, {Component} from 'react';
import {connect} from 'react-redux';
import queryServer from './../queryServer';
import paths from './../paths';
import Loader from './../components/Loader';

class ChronometryEditPage extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            event: null
        }

        this.handleServerResponse = this.handleServerResponse.bind(this);
    }
    componentDidMount() {
        let isHasList = this.isHasList();
        if (isHasList) {
            const id = this.props.match.params.id;
            const event = this.props.eventsListings[this.convertDate()].filter(event => event._id === id)[0]
            this.setState({isLoading: false, event: event});
        }
        if (this.props.name !== undefined && !isHasList) {
            this.getEvent();
        }
    }
    componentDidUpdate(prevProps) {
        if (
            prevProps.name !== this.props.name
            && this.props.name !== undefined
            && !this.isHasList()
        ) {
            this.getEvent();
        }
    }

    convertDate() {
        const {day, month, year} = this.props.date;
        return `${day}.${month}.${year}`;
    }
    isHasList() {
        return !!this.props.eventsListings[this.convertDate()];
    }

    handleServerResponse(response) {
        if (response.status === 'success') {
            // setTimeout(() => {
                this.setState({isLoading: false});
            // }, 1000);
        }
        if (response.event.length > 0) {
            this.setState({event: response.event[0]});
        }
    }
    getEvent() {
        queryServer({
            path: paths.getEvent,
            data: {
                name: this.props.name,
                id: this.props.match.params.id
            },
            callback: this.handleServerResponse
        });
    }

    render() {

        if (this.state.isLoading) return <Loader />

        return (
            <div>
                <h2>Chronometry edit page</h2>
                {this.state.event && this.state.event.type}
            </div>
        )
    }
}

export default connect(
    state => ({
        name: state.user.name,
        date: state.date,
        eventsListings: state.eventsListings
    })
)(ChronometryEditPage)