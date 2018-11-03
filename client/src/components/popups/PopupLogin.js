import React from 'react';
import {connect} from 'react-redux';
import * as action from '../../store/actions';
import LoginAccountForm from '../forms/LoginAccountForm';
import { FaTimes } from 'react-icons/fa';



const LoginPopup = ({togglePopupLogin}) => (
    <div className="popup">
        <button className="tile btn-close" onClick={() => togglePopupLogin(false)}><FaTimes /></button>
        <div className="inner">
            <LoginAccountForm />
        </div>
    </div>
);

export default connect(
    null,
    dispatch => ({
        togglePopupLogin: function(boolean) {
            dispatch(action.togglePopupLogin(boolean))
        }
    })
)(LoginPopup)
