import React, {Component} from 'react';
import {connect} from 'react-redux';
import FormGen from './../../support/formGen';
import { removeFormData } from './../../data/formsData';
import MM from './../../modules/MessageModule';
import UM from './../../modules/UserModule';
import QM from './../../modules/QueryModule';

class RemoveAccountForm extends Component {
    constructor(props) {
        super(props);

        this.form = new FormGen(removeFormData, this);

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
        this.deleteUser();

    }

    async deleteUser() {

        const queryData = {
            login: this.props.name,
            password: this.getField('password')
        }
        const {success} = QM.deleteUser(queryData);

        const status = success ? 'success' : 'error';
        let message = success
            ? MM.userRemoveSuccess().text
            : MM.userRemoveFailure().text;

        this.setState({message: message, messageStatus: status});

        if (success) {
            UM.unsetUser(this.props.dispath);
        }


    }


    render() {
        const {message, messageStatus} = this.state;

        let myForm = this.form.generateForm();

        return (
            <form onSubmit={this.submitHandler}>
                <h3>Remove me</h3>
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
        dispatch
    })
)(RemoveAccountForm)
