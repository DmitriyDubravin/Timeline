import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as action from './../store/actions';
import LoginAccountForm from './forms/LoginAccountForm';



class LoginPopup extends Component {
    render() {
        return (
            <div className="popup">
                <LoginAccountForm />
                <button onClick={() => this.props.toggleLoginPopup(false)} className="close">X</button>
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
