import React, {Component} from 'react';
import {connect} from 'react-redux';
import queryServer from './../../queryServer';
import * as action from './../../store/actions';
import FormGen from './../../support/formGen';
import { loginFormData } from './../../data/formsData';
import { setCookie } from './../../support/cookies';
import m from './../../support/messages';

class LoginAccountForm extends Component {
    constructor(props) {
        super(props);

        this.form = new FormGen(loginFormData, this);

        this.state = {
            message: '',
            messageStatus: '',
            isFormValid: false,
            form: this.form.getFormData()
        }
        this.submitHandler = this.submitHandler.bind(this);
        this.handleServerResponse = this.handleServerResponse.bind(this);
        this.getField = this.getField.bind(this);
    }

    getField(fieldName) {
        return this.state.form.filter(field => field.name === fieldName)[0].value;
    }

    handleServerResponse(response) {

        const {status} = response;

        let message = "";
        if (status === 'success') {
            message = m.loginSuccess()
        } else {
            if (response.cause === "email") {
                message = m.loginFailureEmail();
            } else {
                message = m.loginFailure()
            }
        }

        this.setState({message, messageStatus: status})

        if (status === 'success') {
            this.props.setUserName(response.name);
            this.props.setUserToken(response.token);
            this.props.setUserAuthorization(true);
            this.props.togglePopupLogin(false);
            setCookie(response.token);
        }
    }

    submitHandler(event) {
        event.preventDefault();
        queryServer({
            path: '/user-login',
            data: {
                login: this.getField('name'),
                password: this.getField('password')
            },
            callback: this.handleServerResponse
        });
    }

    render() {
        const {message, messageStatus} = this.state;

        let myForm = this.form.generateForm();

        return (
            <form className="login-form" onSubmit={this.submitHandler}>
                {myForm}
                {message.length > 0 && <div className={`msg ${messageStatus}`}>{message}</div>}
            </form>
        )
    }
}



export default connect(
    null,
    // state => ({
    //     name: state.user.name
    // }),
    dispatch => ({
        setUserName: function(name) {
            dispatch(action.setUserName(name))
        },
        setUserToken: function(token) {
            dispatch(action.setUserToken(token))
        },
        setUserAuthorization: function(boolean) {
            dispatch(action.setUserAuthorization(boolean))
        },
        togglePopupLogin: function(boolean) {
            dispatch(action.togglePopupLogin(boolean))
        }
    })
)(LoginAccountForm)
