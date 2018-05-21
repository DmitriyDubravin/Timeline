import React, {Component} from 'react';
import {connect} from 'react-redux';
import apiQuery from './../../Api';
import * as action from './../../store/actions';
// import * as action from './../../store/actions';
import FormGen from './../../formGen';
import { removeFormData } from './../../pages/formsData';

class Remove extends Component {
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
        this.serverResponse = this.serverResponse.bind(this);
        this.getField = this.getField.bind(this);
    }

    getField(fieldName) {
        return this.state.form.filter(field => field.name === fieldName)[0].value;
    }

    serverResponse(response) {
        const {message, status} = response.data;
        this.setState({message: message, messageStatus: status})
        if (status === 'success') {
            this.props.setUserName('guest');
        }
    }

    submitHandler(event) {
        event.preventDefault();
        apiQuery({
            path: '/user-remove',
            data: {
                login: this.props.name,
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

export default connect(
    state => ({
        name: state.user.name
    }),
    dispatch => ({
        setUserName: function(name) {
            dispatch(action.setUserName(name))
        }
    })
)(Remove)
