import React from 'react';
import {connect} from 'react-redux';
import * as action from './../../store/actions';
import { FaTimes } from 'react-icons/fa';
import DatePicker from './../DatePicker';

const PopupMainNav = ({togglePopupDatePicker}) => (
    <div className="popup">
        <button className="tile btn-close" onClick={() => togglePopupDatePicker(false)}><FaTimes /></button>
        <div className="inner">
            <DatePicker />
        </div>
    </div>
);

export default connect(
    null,
    dispatch => ({
        togglePopupDatePicker: function(boolean) {
            dispatch(action.togglePopupDatePicker(boolean))
        }
    })
)(PopupMainNav)