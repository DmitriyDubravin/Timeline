import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as action from '../store/actions';
import EditChronometryEventForm from './forms/EditChronometryEventForm';

class PopupEventEdit extends Component {
    render() {
        return (
            <div className="popup">
                <button className="link-close" onClick={() => this.props.togglePopupEditEvent(false)}>X</button>
                <EditChronometryEventForm />
            </div>
        );
    }
}
export default connect(
    state => ({
        user: state.user
    }),
    dispatch => ({
        togglePopupEditEvent: function(boolean) {
            dispatch(action.togglePopupEditEvent(boolean))
        },
    })
)(PopupEventEdit)