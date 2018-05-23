import React, {Component} from 'react';
import apiQuery from './../../Api';

import FormGen from './../../support/formGen';
import { registerFormData } from './../../data/formsData';


export default class RegisterAccountForm extends Component {
    constructor(props) {
        super(props);

        this.form = new FormGen(registerFormData, this);

        this.state = {
            message: '',
            messageStatus: '',
            isFormValid: false,
            form: this.form.getFormData()
        }
        this.submitHandler = this.submitHandler.bind(this);
        this.serverResponse = this.serverResponse.bind(this);
        this.getField = this.getField.bind(this);
    }

    getField(fieldName) {
        return this.state.form.filter(field => field.name === fieldName)[0].value;
    }

    serverResponse(response) {
        const {message, status} = response.data;
        this.setState({message: message, messageStatus: status})
    }
    submitHandler(event) {
        event.preventDefault();
        apiQuery({
            path: '/user-register',
            data: {
                login: this.getField('name'),
                email: this.getField('email'),
                password: this.getField('password')
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