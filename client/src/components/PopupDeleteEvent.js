import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as action from '../store/actions';
import Event from './Event';
import queryServer from './../queryServer';
import paths from './../paths';

class PopupEventEdit extends Component {
    constructor(props) {
        super(props);
        this.removeEvent = this.removeEvent.bind(this);
        this.handleServerResponse = this.handleServerResponse.bind(this);
    }
    handleServerResponse(response) {
        // TEMP! no errors handling
        if (response.status === 'success') {
            const {date, event, removeEvent, togglePopupDeleteEvent} = this.props;
            removeEvent(date, event._id);
            togglePopupDeleteEvent(false);
        }
    }
    removeEvent() {
        queryServer({
            path: paths.removeEvent,
            data: {
                name: this.props.name,
                _id: this.props.event._id
            },
            callback: this.handleServerResponse
        });
    }
    render() {
        const {event, togglePopupDeleteEvent} = this.props;
        return (
            <div className="popup">
                <button className="link-close" onClick={() => togglePopupDeleteEvent(false)}>X</button>
                <Event {...event} />
                <button className="danger" onClick={this.removeEvent}>Delete</button>
            </div>
        )
    }
}

export default connect(
    state => ({
        name: state.user.name,
        date: state.date.date,
        event: state.eventsData.events[state.popups.deleteEvent.id]
    }),
    dispatch => ({
        togglePopupDeleteEvent: function(boolean) {
            dispatch(action.togglePopupDeleteEvent(boolean))
        },
        removeEvent: function(date, eventId) {
            dispatch(action.removeEvent(date, eventId))
        }
    })
)(PopupEventEdit)