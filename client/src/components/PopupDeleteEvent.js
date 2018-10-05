import React from 'react';
import {connect} from 'react-redux';
import * as action from '../store/actions';
import Event from './Event';

const PopupEventEdit = ({event, togglePopupDeleteEvent}) => (
    <div className="popup">
        <button className="link-close" onClick={() => togglePopupDeleteEvent(false)}>X</button>
        <Event {...event} />
        <button className="danger">Delete</button>
    </div>
);

export default connect(
    state => ({
        user: state.user,
        event: state.eventsData.events[state.popups.deleteEvent.id]
    }),
    dispatch => ({
        togglePopupDeleteEvent: function(boolean) {
            dispatch(action.togglePopupDeleteEvent(boolean))
        },
    })
)(PopupEventEdit)