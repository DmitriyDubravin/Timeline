import React from 'react';
import {connect} from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import * as action from './../../store/actions';
import FormEditEvent from './../forms/FormEditEvent';

const PopupEventEdit = ({togglePopupEditEvent}) => (
    <div className="popup">
        <button className="tile btn-close" onClick={() => togglePopupEditEvent(false)}><FaTimes /></button>
        <div className="inner">
            <FormEditEvent />
        </div>
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