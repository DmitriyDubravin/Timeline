import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import * as action from './../store/actions';
// import {Link} from 'react-router-dom';
// import LoginPopup from './popups/PopupLogin';
import { FaUser } from 'react-icons/fa';
import UM from './../modules/UserModule';

class UserNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
        this.toggleMenu = this.toggleMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
        this.logout = this.logout.bind(this);
    }
    toggleMenu() {
        this.setState({isOpen: !this.state.isOpen});
    }
    closeMenu() {
        this.setState({isOpen: !this.state.isOpen});
    }
    togglePopup(e) {
        e.preventDefault();
        this.props.togglePopupLogin(!this.props.isLoginShown);
    }
    logout() {
        const {dispatch} = this.props;
        UM.unsetUser(dispatch);
        UM.deleteToken();
    }
    render() {

        // const {user: {name, isAuthorized}, login} = this.props;

        return (
            <Fragment>
                <button className="tile" onClick={this.toggleMenu}><FaUser /></button>
                {/* <div className="user-box">
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
                </div> */}
                {/* {login.show && <LoginPopup />} */}
                {/* <nav>
                    {
                        this.state.isOpen &&
                        <ul className="main-nav">
                            <li><Link onClick={this.closeMenu} to="/">Home</Link></li>
                            <li><Link onClick={this.closeMenu} to="/chronometry">Chronometry</Link></li>
                            <li><Link onClick={this.closeMenu} to="/users">Users</Link></li>
                            <li><Link onClick={this.closeMenu} to="/search">Search</Link></li>
                        </ul>
                    }
                </nav> */}
            </Fragment>
        )
    }
}

export default connect(
    state => ({
        user: state.user,
        login: state.popups.login
    }),
    dispatch => ({
        dispatch,
        togglePopupLogin: function(boolean) {
            dispatch(action.togglePopupLogin(boolean))
        },
        togglePopupAddEvent: function(boolean) {
            dispatch(action.togglePopupAddEvent(boolean))
        }
    })
)(UserNav)

