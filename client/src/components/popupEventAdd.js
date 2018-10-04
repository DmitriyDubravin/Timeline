import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as action from './../store/actions';
import AddChronometryEventForm from './../components/forms/AddChronometryEventForm';

class PopupEventAdd extends Component {
    render() {
        return (
            <div className="popup">
                <button className="link-close" onClick={() => this.props.togglePopupAddEvent(false)}>X</button>
                <AddChronometryEventForm />
            </div>
        );
    }
}
export default connect(
    state => ({
        user: state.user
    }),
    dispatch => ({
        togglePopupAddEvent: function(boolean) {
            dispatch(action.togglePopupAddEvent(boolean))
        },
    })
)(PopupEventAdd)