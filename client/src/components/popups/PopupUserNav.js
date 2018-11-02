import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as action from './../../store/actions';
import {Link} from 'react-router-dom';
import { FaTimes, FaSignInAlt, FaSignOutAlt, FaUserPlus } from 'react-icons/fa';
import UM from './../../modules/UserModule';

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

        const {user: {isAuthorized, name}, togglePopupUserNav, togglePopupLogin} = this.props;

        return (
            <div className="popup">
                <button className="tile btn-close" onClick={() => togglePopupUserNav(false)}><FaTimes /></button>
                {
                    isAuthorized &&
                    <div className="user-nav">
                        <Link className="tile" onClick={() => togglePopupUserNav(false)} to={`/users/${name}`}>
                            {name}
                        </Link>
                        <button
                            className="tile"
                            onClick={() => {
                                togglePopupUserNav(false);
                                this.logout();
                            }}
                        >
                            <FaSignOutAlt />
                        </button>
                    </div>
                }
                {
                    !isAuthorized &&
                    <div className="user-nav">
                        <Link
                            className="tile"
                            to="/register"
                            onClick={() => {
                                togglePopupUserNav(false);
                            }}
                        >
                            <FaUserPlus />
                        </Link>
                        <button
                            className="tile"
                            onClick={() => {
                                togglePopupUserNav(false);
                                togglePopupLogin(true);
                            }}
                        >
                            <FaSignInAlt />
                        </button>
                    </div>
                }
            </div>
        )
    }
}

export default connect(
    state => ({
        user: state.user,
    }),
    dispatch => ({
        dispatch,
        togglePopupUserNav: function(boolean) {
            dispatch(action.togglePopupUserNav(boolean))
        },
        togglePopupLogin: function(boolean) {
            dispatch(action.togglePopupLogin(boolean))
        },
    })
)(UserNav)

