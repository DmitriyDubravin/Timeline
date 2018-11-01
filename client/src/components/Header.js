import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import * as action from './../store/actions';
// import MainNav from './MainNav';
import MainLogo from './MainLogo';
import UserNav from './UserNav';
import { FaBars } from 'react-icons/fa';



class Header extends Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        const {togglePopupMainNav} = this.props;

        return (
            <Fragment>
                {/* <MainNav /> */}
                <button onClick={() => togglePopupMainNav(true)} className="tile"><FaBars /></button>
                <MainLogo />
                <UserNav />
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
        togglePopupMainNav: function(boolean) {
            dispatch(action.togglePopupMainNav(boolean))
        }
    })
)(Header)

