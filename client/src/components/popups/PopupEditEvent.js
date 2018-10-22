import React from 'react';
import {connect} from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import * as action from './../../store/actions';
import FormEditEvent from './../forms/FormEditEvent';

const PopupEventEdit = ({togglePopupEditEvent}) => (
    <div className="popup">
        <button className="link-close icon" onClick={() => togglePopupEditEvent(false)}><FaTimes /></button>
        <FormEditEvent />
    </div>
);

export default connect(
    null,
    dispatch => ({
        togglePopupEditEvent: function(boolean) {
            dispatch(action.togglePopupEditEvent(boolean))
        },
    })
)(PopupEventEdit)