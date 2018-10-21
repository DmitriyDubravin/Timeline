import React, {Component} from 'react';
import {connect} from 'react-redux';
import queryServer from './../../queryServer';
import * as action from './../../store/actions';
import FormGen from './../../support/formGen';
import { loginFormData } from './../../data/formsData';
import MM from './../../modules/MessageModule';
import UM from './../../modules/UserModule';
import paths from './../../paths';

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

        const {success} = response;

        let message = "";
        const status = success ? 'success' : 'error';
        if (success) {
            message = MM.loginSuccess().text;
        } else {
            if (response.cause === "email") {
                message = MM.loginFailureEmail().text;
            } else {
                message = MM.loginFailure().text;
            }
        }

        this.setState({message, messageStatus: status})

        if (success) {
            const {dispatch, togglePopupLogin} = this.props;
            const {name, token} = response;

            UM.setUser(dispatch, name, token)
            UM.setToken(token);

            togglePopupLogin(false);
        }
    }

    submitHandler(event) {
        event.preventDefault();
        queryServer({
            path: paths.userLogin,
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
    dispatch => ({
        dispatch,
        togglePopupLogin: function(boolean) {
            dispatch(action.togglePopupLogin(boolean))
        }
    })
)(LoginAccountForm)
