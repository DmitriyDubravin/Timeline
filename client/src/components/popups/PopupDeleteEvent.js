import React, {Component} from 'react';
import {connect} from 'react-redux';
import { FaTimes, FaTrashAlt } from 'react-icons/fa';
import * as action from './../../store/actions';
import Event from './../Event';
import QM from './../../modules/QueryModule';

class PopupEventEdit extends Component {
    constructor(props) {
        super(props);
        this.removeEvent = this.removeEvent.bind(this);
    }
    async removeEvent() {

        const {name, event} = this.props;
        const response = await QM.removeEvent(name, event._id);
        const {success} = response;

        if (success) {
            const {date, event, removeEvent, togglePopupDeleteEvent} = this.props;
            removeEvent(date, event._id);
            togglePopupDeleteEvent(false);
        } else {
            // TEMP! no errors handling
        }

    }
    render() {
        const {event, togglePopupDeleteEvent} = this.props;
        return (
            <div className="popup">
                <button className="link-close icon" onClick={() => togglePopupDeleteEvent(false)}><FaTimes /></button>
                <Event {...event} />
                <button className="danger icon" onClick={this.removeEvent}><FaTrashAlt /></button>
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