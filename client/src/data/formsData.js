
import {TextField, PasswordField, EmailField, SubmitField, SelectField} from './../components/formElements';

export const registerFormData = [
    {
        component: TextField,
        name: 'name',
        placeholder: 'your name',
        required: true,
        rules: {
            minLength: 5,
            maxLength: 10
        }
    },
    {
        component: EmailField,
        name: "email",
        placeholder: "your@email.com",
        required: true,
        rules: {
            isEmail: true
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
        component: PasswordField,
        name: "password-again",
        placeholder: "password again",
        required: true,
        rules: {
            minLength: 6,
            maxLength: 10,
            matchTo: 'password'
        }
    },
    {
        component: SubmitField,
        value: "Register"
    }
];



export const changePasswordFormData = [
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
            maxLength: 10,
            matchTo: 'newPassword'
        }
    },
    {
        component: SubmitField,
        value: "Change Password"
    }
];

export const removeFormData = [
    {
        component: PasswordField,
        name: 'password',
        placeholder: 'password',
        required: true,
        rules: {
            minLength: 6,
            maxLength: 10
        }
    },
    {
        component: SubmitField,
        cls: 'danger',
        value: "Remove Me"
    }
];

export const addChronometryEventFormData = [
    {
        component: SelectField,
        name: 'type',
        placeholder: 'Event Type',
        required: true,
        rules: {
            minLength: 3,
            maxLength: 32
        }
    },
    {
        component: SubmitField,
        value: "Add Event"
    }
];