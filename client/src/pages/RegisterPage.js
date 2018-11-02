import React from 'react';
import {Redirect} from 'react-router-dom';
import RegisterAccountForm from './../components/forms/RegisterAccountForm';
import {connect} from 'react-redux';

const RegisterPage = ({user}) => {
    if (user.isAuthorized) {
        return <Redirect to="/" />
    };
    return <RegisterAccountForm />
}

export default connect(
    state => ({
        user: state.user
    })
)(RegisterPage);
