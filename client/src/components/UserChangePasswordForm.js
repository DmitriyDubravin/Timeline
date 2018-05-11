import React, {Component} from 'react';
import {connect} from 'react-redux';

import apiQuery from './../Api';
import * as action from './../store/actions';



const Input = ({props: {type, name, placeholder, value, onChange, cls}}) => {
    return (
        <input
            className={cls}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
}

const formData = [
    {
        component: Input,
        type: 'password',
        name: 'currentPassword',
        placeholder: 'current password',
        value: '',
        onChange: this.inputHandler
    },
    {
        component: Input,
        type: "password",
        name: "newPassword",
        placeholder: "new password",
        value: '',
        onChange: this.inputHandler
    },
    {
        component: Input,
        type: "password",
        name: "repeatNewPassword",
        placeholder: "Repeat new password",
        value: "",
        onChange: this.inputHandler
    },
    {
        component: Input,
        type: "submit",
        disabled: false,
        value: "Change Password"
    }
];

class ChangePasswordForm extends Component {
    constructor(props) {
        super(props);

        this.myForm = formData.map(field => {
            if (field.name === 'currentPassword') {
                return {...field, value: this.props.x}
            } else {
                return field;
            }
        });

        let formFields = this.myForm
            .filter(field => field.name !== undefined)
            .map((field) => ({[field.name]: field.value}))
            .reduce((acc, val) => ({...acc, ...val}));

        this.state = {
            message: '',
            messageStatus: '',
            isFormValid: true,
            form: formFields
        }

        this.inputHandler = this.inputHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.serverResponse = this.serverResponse.bind(this);

    }

    formValidator() {
        let obj = this.state;
        let arr = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (key.indexOf('-isValid') >= 0) {
                    arr.push(obj[key]);
                }
            }
        }
        this.setState({isFormValid: arr.every(item => item)})
    }
    inputValidator(value) {
        return value.length >= 6
    }

    inputHandler(event) {
        const {name, value} = event.target;

        let sss = {
            [name]: value,
            [name +'-isValid']: this.inputValidator(value)
        }
        let newF = {
            ...this.state,
            form: {
                ...this.state.form, ...sss
            }
        }

        this.setState(newF, this.formValidator);
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
        const {form, message} = this.state;
        console.log('form', form);

        let myForm = this.myForm
            .map(field => {

                let isValid = form[field.name + '-isValid'];
                let cls = '';
                if (isValid !== undefined && !isValid) {
                    cls = 'error'
                }
                return {
                    ...field,
                    value: form[field.name],
                    cls: cls,
                    onChange: this.inputHandler
                }
            })
            .map((field, i) => <field.component key={i} props={field} />);

        return (
            <form onSubmit={this.submitHandler}>
                {myForm}
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
