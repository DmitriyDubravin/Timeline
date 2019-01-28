import React from 'react';
import {Link} from 'react-router-dom';
import { FaHome, FaClock, FaUsers, FaSearch } from 'react-icons/fa';

const MainNav = ({close}) => (
    <ul className="main-nav">
        <li className="tile"><Link onClick={close} to="/"><FaHome /></Link></li>
        <li className="tile"><Link onClick={close} to="/chronometry"><FaClock /></Link></li>
        <li className="tile"><Link onClick={close} to="/users"><FaUsers /></Link></li>
        <li className="tile"><Link onClick={close} to="/search"><FaSearch /></Link></li>
    </ul>
);

export default MainNav;
