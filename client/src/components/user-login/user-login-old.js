import React, {Component} from 'react';
import FormGen from '../../support/formGen';
import { loginFormData } from '../../data/formsData';
import MM from '../../modules/MessageModule';
import UM from '../../modules/UserModule';
import QM from '../../modules/QueryModule';

class UserLogin extends Component {
    constructor(props) {
        super(props);

        this.form = new FormGen([
            {
                component: TextField,
                name: 'name',
                placeholder: 'login',
                required: true,
                rules: {
                    minLength: 5,
                    maxLength: 10
                }
            },
            {
                component: PasswordField,
                name: "password",
                placeholder: "password",
                required: true,
                rules: {
                    minLength: 6,
                    maxLength: 10
                }
            },
            {
                component: SubmitField,
                value: "Login"
            }
        ], this);

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
        this.loginUser();
    }

    async loginUser() {

        const queryData = {
            login: this.getField('name'),
            password: this.getField('password')
        };

        const {success, cause, name, token} = await QM.loginUser(queryData);

        let message = "";
        const status = success ? 'success' : 'error';
        if (success) {
            message = MM.loginSuccess().text;
        } else {
            if (cause === "email") {
                message = MM.loginFailureEmail().text;
            } else {
                message = MM.loginFailure().text;
            }
        }

        this.setState({message, messageStatus: status})

        if (success) {
            const {dispatch, redirect} = this.props;

            UM.setUser(dispatch, name, token)
            UM.setToken(token);

            redirect();
        }
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



export default UserLogin;
