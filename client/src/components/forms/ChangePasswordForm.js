import React, {Component} from 'react';
import {connect} from 'react-redux';

import queryServer from './../../queryServer';
import FormGen from './../../support/formGen';
import { changePasswordFormData } from './../../data/formsData';
import paths from './../../paths';
import MM from './../../modules/MessageModule';



class ChangePasswordForm extends Component {
    constructor(props) {
        super(props);

        this.form = new FormGen(changePasswordFormData, this);

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
        const status = success ? 'success' : 'error';
        let message = success
            ? MM.userPasswordChangeSuccess().text
            : MM.userPasswordChangeFailure().text;

        this.setState({
            message: message,
            messageStatus: status
        });

    }
    submitHandler(event) {
        event.preventDefault();
        queryServer({
            path: paths.changeUserPassword,
            data: {
                login: this.props.name,
                currentPassword: this.state.form[0].value,
                newPassword: this.state.form[1].value
            },
            callback: this.handleServerResponse
        });
    }

    render() {
        const {message, messageStatus} = this.state;

        let myForm = this.form.generateForm();

        return (
            <form onSubmit={this.submitHandler}>
                <h3>Change Password</h3>
                {myForm}
                {message.length > 0 && <div className={`msg ${messageStatus}`}>{message}</div>}
            </form>
        )
    }
}



export default connect(
    state => ({
        name: state.user.name
    }),
)(ChangePasswordForm)
