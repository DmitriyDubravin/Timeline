import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as action from '../../store/actions';
import LoginAccountForm from '../forms/LoginAccountForm';
import { FaTimes } from 'react-icons/fa';



class LoginPopup extends Component {
    render() {
        return (
            <div className="popup">
                <button
                    className="tile"
                    onClick={() => this.props.togglePopupLogin(false)}
                >
                    <FaTimes />
                </button>
                <LoginAccountForm />
            </div>
        )
    }
}



export default connect(
    null,
    dispatch => ({
        togglePopupLogin: function(boolean) {
            dispatch(action.togglePopupLogin(boolean))
        }
    })
)(LoginPopup)
