import React, {Component} from 'react';
import {connect} from 'react-redux';
import queryServer from './../queryServer';
import paths from './../paths';
import Loader from './../components/Loader';
import ConditionalRender from './ConditionalRender';

class ChronometryRemovePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            event: null
        }

        this.handleServerResponse = this.handleServerResponse.bind(this);
    }
    componentDidMount() {

        const id = this.props.match.params.id;
        if (Object.keys(this.props.eventsListings).length !== 0) {
            const event = this.props.eventsListings[this.convertDate()].filter(event => event._id === id)[0];
            this.setState({isLoading: false, event: event});
        } else {
            this.getEvent();
        }

    }

    convertDate() {
        const {day, month, year} = this.props.date;
        return `${day}.${month}.${year}`;
    }

    handleServerResponse(response) {
        if (response.status === 'success') {
            this.setState({isLoading: false});
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

        const {start, finish, type, category, subcategory, comment} = this.state.event;

        return (
            <div>
                <h2>Chronometry remove page</h2>
                {start} | 
                {finish} | 
                {type} | 
                {category} | 
                {subcategory} | 
                {comment}
            </div>
        )
    }
}



const CEP = connect(
    state => ({
        name: state.user.name,
        date: state.date,
        eventsListings: state.eventsListings
    })
)(ChronometryRemovePage)



export default ConditionalRender(
    state => state.user.isAuthorized,
    CEP
);


