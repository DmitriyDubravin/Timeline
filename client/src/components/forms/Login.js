import React, {Component} from 'react';
import {connect} from 'react-redux';
import apiQuery from './../../Api';
import * as action from './../../store/actions';
import FormGen from './../../formGen';
import { loginFormData } from './../../pages/formsData';

class Login extends Component {
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
        this.serverResponse = this.serverResponse.bind(this);
        this.getField = this.getField.bind(this);
    }

    getField(fieldName) {
        return this.state.form.filter(field => field.name === fieldName)[0].value;
    }

    serverResponse(response) {
        const {message, status, data} = response.data;
        this.setState({message: message, messageStatus: status})
        if (status === 'success') {
            this.props.setUserName(data.name);
        }
    }

    submitHandler(event) {
        event.preventDefault();
        apiQuery({
            path: '/user-login',
            data: {
                login: this.getField('name'),
                password: this.getField('password')
            },
            callback: this.serverResponse
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
        }
    })
)(Login)
