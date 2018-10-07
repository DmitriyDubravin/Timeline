import React from 'react';
import {connect} from 'react-redux';
import * as action from '../store/actions';
import FormAddEvent from './forms/FormAddEvent';
import { FaTimes } from 'react-icons/fa';

const PopupEventAdd = ({togglePopupAddEvent}) => (
    <div className="popup">
        <button className="link-close icon" onClick={() => togglePopupAddEvent(false)}><FaTimes /></button>
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