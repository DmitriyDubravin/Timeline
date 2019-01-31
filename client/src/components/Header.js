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
            openPopupNavMain,
            openPopupNavUser
        } = this.props;

        return (
            <Fragment>
                <button className="tile" onClick={openPopupNavMain}><FaBars /></button>
                <MainLogo />
                <button className="tile" onClick={openPopupNavUser}><FaUser /></button>
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
        openPopupNavMain() {
            dispatch(action.togglePopupNavMain({ show: true }))
        },
        openPopupNavUser() {
            dispatch(action.togglePopupNavUser({ show: true}))
        },
    })
)(Header)

