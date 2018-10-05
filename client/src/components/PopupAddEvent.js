import React from 'react';
import {connect} from 'react-redux';
import * as action from '../store/actions';
import FormAddEvent from './forms/FormAddEvent';

const PopupEventAdd = ({togglePopupAddEvent}) => (
    <div className="popup">
        <button className="link-close" onClick={() => togglePopupAddEvent(false)}>X</button>
        <FormAddEvent />
    </div>
);

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