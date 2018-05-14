import React, {Component} from 'react';
import {connect} from 'react-redux';

import apiQuery from './../Api';
import * as action from './../store/actions';

import FormGen from './../formGen';
import { PasswordField, SubmitField } from './../formElements';



const formData = [
    {
        component: PasswordField,
        name: 'currentPassword',
        cls: 'custom-class',
        placeholder: 'current password',
        required: true,
        rules: {
            minLength: 6,
            maxLength: 10
        }
    },
    {
        component: PasswordField,
        name: "newPassword",
        placeholder: "new password",
        required: true,
        rules: {
            minLength: 6,
            maxLength: 10
        }
    },
    {
        component: PasswordField,
        name: "repeatNewPassword",
        placeholder: "repeat new password",
        required: true,
        rules: {
            minLength: 6,
            maxLength: 10
        }
    },
    {
        component: SubmitField,
        value: "Change Password"
    }
];



class ChangePasswordForm extends Component {
    constructor(props) {
        super(props);

        this.form = new FormGen(formData, this);

        this.state = {
            message: '',
            messageStatus: '',
            isFormValid: false,
            form: this.form.getFormData()
        }

        this.submitHandler = this.submitHandler.bind(this);
        this.serverResponse = this.serverResponse.bind(this);
    }

    serverResponse(response) {
        const {message, status} = response.data;
        this.setState({message: message, messageStatus: status})
    }
    submitHandler(event) {
        event.preventDefault();
        apiQuery({
            path: '/user-change-password',
            data: {
                login: 'admin', // this.props.login, // will be token later
                currentPassword: this.state.form[0].value,
                newPassword: this.state.form[1].value
            },
            callback: this.serverResponse
        });
    }

    render() {
        const {message, messageStatus} = this.state;

        let myForm = this.form.generateForm();

        return (
            <form onSubmit={this.submitHandler}>
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
    dispatch => ({
        setUserName: function(name) {
            dispatch(action.setUserName(name))
        }
    })
)(ChangePasswordForm)
