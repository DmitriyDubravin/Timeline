import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import * as action from './../store/actions';
// import MainNav from './MainNav';
import MainLogo from './MainLogo';
import { FaBars, FaUser } from 'react-icons/fa';



class Header extends Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        const {
            togglePopupMainNav,
            togglePopupUserNav
        } = this.props;

        return (
            <Fragment>
                <button className="tile" onClick={() => togglePopupMainNav(true)}><FaBars /></button>
                <MainLogo />
                <button className="tile" onClick={() => togglePopupUserNav(true)}><FaUser /></button>
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
        togglePopupMainNav(boolean) {
            dispatch(action.togglePopupMainNav({ show: boolean }))
        },
        togglePopupUserNav: function(boolean) {
            dispatch(action.togglePopupUserNav(boolean))
        },
    })
)(Header)

