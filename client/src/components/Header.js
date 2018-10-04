import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';
import * as action from './../store/actions';
import { deleteCookie } from './../support/cookies';
import Date from './Date';
import MainNav from './MainNav';
import LoginPopup from './LoginPopup';

class Header extends Component {
    constructor(props) {
        super(props);

        this.togglePopup = this.togglePopup.bind(this);
        this.logout = this.logout.bind(this);
    }
    togglePopup(e) {
        e.preventDefault();
        this.props.togglePopupLogin(!this.props.isLoginShown);
    }
    logout() {
        deleteCookie();
        this.props.setUserName(false);
        this.props.setUserToken(false);
        this.props.setUserAuthorization(false);
    }
    render() {

        const {user, login} = this.props;
        const {name, isAuthorized} = user;

        return (
            <div className="header">
                <Date />
                <div className="user-box">
                    {
                        isAuthorized &&
                        <div>
                            <Link to={`/users/${name}`}>{name}</Link> <button onClick={this.logout}>Logout</button>
                        </div>
                    }
                    {
                        !isAuthorized &&
                        <div>
                            <a href="/" onClick={this.togglePopup}>Login</a> | <Link to="/register">Register</Link>
                        </div>
                    }
                </div>
                {login.show && <LoginPopup />}
                <MainNav />
            </div>
        )
    }
}



export default connect(
    state => ({
        user: state.user,
        login: state.popups.login
    }),
    dispatch => ({
        setUserName: function(name) {
            dispatch(action.setUserName(name))
        },
        setUserToken: function(token) {
            dispatch(action.setUserToken(token))
        },
        setUserAuthorization: function(name) {
            dispatch(action.setUserAuthorization(name))
        },
        togglePopupLogin: function(boolean) {
            dispatch(action.togglePopupLogin(boolean))
        }
    })
)(Header)

