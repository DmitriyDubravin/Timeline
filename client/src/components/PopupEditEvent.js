import React from 'react';
import {connect} from 'react-redux';
import * as action from '../store/actions';
import FormEditEvent from './forms/FormEditEvent';

const PopupEventEdit = ({togglePopupEditEvent}) => (
    <div className="popup">
        <button className="link-close" onClick={() => togglePopupEditEvent(false)}>X</button>
        <FormEditEvent />
    </div>
);

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