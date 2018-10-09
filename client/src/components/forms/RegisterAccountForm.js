import React, {Component} from 'react';
import queryServer from './../../queryServer';

import FormGen from './../../support/formGen';
import { registerFormData } from './../../data/formsData';

import GlobalMessage from './../GlobalMessage';
import LocalMessage from './../LocalMessage';
import m from './../../support/messages';
import paths from './../../paths';


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
        this.handleServerResponse = this.handleServerResponse.bind(this);
        this.getField = this.getField.bind(this);
    }

    getField(fieldName) {
        return this.state.form.filter(field => field.name === fieldName)[0].value;
    }

    handleServerResponse(response) {

        const {status} = response;

        const message = status === "success"
            ? m.registerSuccess()
            : m.registerFailure();

        this.setState({message, messageStatus: status})

    }
    submitHandler(event) {
        event.preventDefault();
        queryServer({
            path: paths.userRegister,
            data: {
                login: this.getField('name'),
                email: this.getField('email'),
                password: this.getField('password')
            },
            callback: this.handleServerResponse
        });
    }

    render() {
        const {message, messageStatus} = this.state;

        let myForm = this.form.generateForm();

        let content = messageStatus === 'success'
        ? <GlobalMessage cls={messageStatus} txt={message} />
        : <div>
            <form onSubmit={this.submitHandler}>
                {myForm}
            </form>
            <LocalMessage cls={messageStatus} txt={message} />
        </div>

        return content
    }
}