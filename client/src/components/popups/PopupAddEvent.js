import React from 'react';
import {connect} from 'react-redux';
import * as action from './../../store/actions';
import { FaTimes } from 'react-icons/fa';
import FormAddEvent from './../forms/FormAddEvent';

const PopupEventAdd = ({togglePopupAddEvent}) => (
    <div className="popup">
        <button className="tile btn-close" onClick={() => togglePopupAddEvent(false)}><FaTimes /></button>
        <div className="inner">
            <FormAddEvent />
        </div>
    </div>
);

export default connect(
    null,
    dispatch => ({
        togglePopupAddEvent: function(boolean) {
            dispatch(action.togglePopupAddEvent(boolean))
        },
    })
)(PopupEventAdd)