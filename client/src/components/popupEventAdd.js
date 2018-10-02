import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as action from './../store/actions';
import AddChronometryEventForm from './../components/forms/AddChronometryEventForm';

class PopupEventAdd extends Component {
    render() {
        return (
            <div className="popup">
                <button className="link-close" onClick={() => this.props.toggleEventAddPopup(false)}>X</button>
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
        toggleEventAddPopup: function(boolean) {
            dispatch(action.toggleEventAddPopup(boolean))
        },
    })
)(PopupEventAdd)