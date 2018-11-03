import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as action from './../../store/actions';
import { FaTimes, FaHome, FaClock, FaUsers, FaSearch } from 'react-icons/fa';

const PopupMainNav = ({togglePopupMainNav}) => (
    <div className="popup">
        <button className="tile btn-close" onClick={() => togglePopupMainNav(false)}><FaTimes /></button>
        <div className="inner">
            <ul className="main-nav">
                <li className="tile"><Link onClick={() => togglePopupMainNav(false)} to="/"><FaHome /></Link></li>
                <li className="tile"><Link onClick={() => togglePopupMainNav(false)} to="/chronometry"><FaClock /></Link></li>
                <li className="tile"><Link onClick={() => togglePopupMainNav(false)} to="/users"><FaUsers /></Link></li>
                <li className="tile"><Link onClick={() => togglePopupMainNav(false)} to="/search"><FaSearch /></Link></li>
            </ul>
        </div>
    </div>
);

export default connect(
    null,
    dispatch => ({
        togglePopupMainNav: function(boolean) {
            dispatch(action.togglePopupMainNav(boolean))
        }
    })
)(PopupMainNav)