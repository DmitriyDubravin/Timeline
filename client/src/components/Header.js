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
            openPopupMainNav,
            openPopupUserNav
        } = this.props;

        return (
            <Fragment>
                <button className="tile" onClick={openPopupMainNav}><FaBars /></button>
                <MainLogo />
                <button className="tile" onClick={openPopupUserNav}><FaUser /></button>
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
        openPopupMainNav() {
            dispatch(action.togglePopupMainNav({ show: true }))
        },
        openPopupUserNav() {
            dispatch(action.togglePopupUserNav({ show: true}))
        },
    })
)(Header)

