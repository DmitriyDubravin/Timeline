import React, {Component} from 'react';
import FormGen from './../../support/formGen';
import { registerFormData } from './../../data/formsData';
import GlobalMessage from './../GlobalMessage';
import LocalMessage from './../LocalMessage';
import MM from './../../modules/MessageModule';
import QM from './../../modules/QueryModule';


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
        this.getField = this.getField.bind(this);
    }

    getField(fieldName) {
        return this.state.form.filter(field => field.name === fieldName)[0].value;
    }

    submitHandler(e) {
        e.preventDefault();
        this.registerUser();
    }

    async registerUser() {

        const queryData = {
            login: this.getField('name'),
            email: this.getField('email'),
            password: this.getField('password')
        };
        const {success} = await QM.registerUser(queryData);

        const status = success ? 'success' : 'error';
        const message = success
            ? MM.registerSuccess().text
            : MM.registerFailure().text;

        this.setState({message, messageStatus: status})

        console.log(message);

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