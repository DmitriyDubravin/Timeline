import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';
import * as action from './../store/actions';
import Date from './Date';
import MainNav from './MainNav';
import LoginPopup from './LoginPopup';
import Logo from './logo';
import DateSwitcher from './DateSwitcher';
import DatePicker from './DatePicker';
import { FaPlus } from 'react-icons/fa';
import UM from './../modules/UserModule';



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
        UM.deleteToken();
        this.props.setUserName(false);
        this.props.setUserToken(false);
        this.props.setUserAuthorization(false);
    }
    render() {

        const {user, login, togglePopupAddEvent} = this.props;
        const {name, isAuthorized} = user;

        return (
            <div className="header">
                <Logo />
                <MainNav />
                <button onClick={() => togglePopupAddEvent(true)} className="add-popup-opener icon"><FaPlus /></button>
                <Date />
                <DateSwitcher />
                <DatePicker />
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
        },
        togglePopupAddEvent: function(boolean) {
            dispatch(action.togglePopupAddEvent(boolean))
        }
    })
)(Header)

