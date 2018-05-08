import React, {Component} from 'react';
import {connect} from 'react-redux';

import apiQuery from './../Api';
import * as action from './../store/actions';

class ChangePasswordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPassword: '',
            newPassword: '',
            repeatNewPassword: '',
            message: '',
            messageStatus: ''
        }

        this.inputHandler = this.inputHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.serverResponse = this.serverResponse.bind(this);
    }

    formValidator(isValueValid) {
        let obj = this.state;
        let arr = [isValueValid]
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (key.indexOf('-isValid') >= 0) {
                    arr.push(obj[key]);
                }
            }
        }
        return arr.every(item => item)
    }
    inputValidator(value) {
        return value.length >= 6
    }

    inputHandler(event) {
        const {name, value} = event.target;
        let isValueValid = this.inputValidator(value)
        let isFormValid = this.formValidator(isValueValid);

        this.setState({
            [name]: value,
            [name +'-isValid']: isValueValid,
            isFormValid: isFormValid
        });
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
                currentPassword: this.state.currentPassword,
                newPassword: this.state.newPassword
            },
            callback: this.serverResponse
        });
    }

    render() {
        const {currentPassword, newPassword, repeatNewPassword, message} = this.state;
        console.log(JSON.stringify(this.state, 0, 2));
        return (
            <form onSubmit={this.submitHandler}>
                <input type="password" name="currentPassword" placeholder="current password" value={currentPassword} onChange={this.inputHandler} />
                <input type="password" name="newPassword" placeholder="new password" value={newPassword} onChange={this.inputHandler} />
                <input type="password" name="repeatNewPassword" placeholder="repeat new password" value={repeatNewPassword} onChange={this.inputHandler} />
                <input type="submit" value="Change Password" />
                {message.length > 0 && <div className="msg">{message}</div>}
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
