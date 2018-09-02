import React, {Component} from 'react';
import {connect} from 'react-redux';
import queryServer from './../queryServer';
import paths from './../paths';
import Loader from './../components/Loader';
import ConditionalRender from './ConditionalRender';
import {Redirect} from "react-router-dom";
import * as action from './../store/actions';





class ChronometryRemovePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            redirect: false,
            event: null
        }

        this.handleServerResponse = this.handleServerResponse.bind(this);
        this.removeEvent = this.removeEvent.bind(this);
    }
    componentDidMount() {

        const id = this.props.match.params.id;
        const event = this.props.eventsListings[this.convertDate()].filter(event => event._id === id)[0];
        this.setState({isLoading: false, event: event});

    }

    convertDate() {
        const {day, month, year} = this.props.date;
        return `${day}.${month}.${year}`;
    }

    handleServerResponse(response) {

        console.log(response);

        if (response.status === 'success') {
            this.props.removeEvent(this.convertDate(), this.props.match.params.id)
            this.setState({redirect: true});
        }
    }
    removeEvent() {
        queryServer({
            path: paths.removeEvent,
            data: {
                name: this.props.name,
                _id: this.props.match.params.id
            },
            callback: this.handleServerResponse
        });
    }

    render() {


        if (this.state.redirect) {
            return <Redirect to="/chronometry" push={true} />
        }

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
                <button onClick={this.removeEvent}>Remove</button>
            </div>
        )
    }
}



const CEP = connect(
    state => ({
        name: state.user.name,
        date: state.date,
        eventsListings: state.eventsListings
    }),
    dispatch => ({
        removeEvent: function(date, eventId) {
            dispatch(action.removeEvent(date, eventId))
        }
    })
)(ChronometryRemovePage)



export default ConditionalRender(
    state => state.user.isAuthorized,
    CEP
);


