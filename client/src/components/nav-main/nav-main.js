import React from 'react';
import {Link} from 'react-router-dom';
import { FaHome, FaClock, FaUsers, FaSearch } from 'react-icons/fa';

const NavMain = ({redirect}) => (
    <ul className="main-nav">
        <li className="tile"><Link onClick={redirect} to="/"><FaHome /></Link></li>
        <li className="tile"><Link onClick={redirect} to="/chronometry"><FaClock /></Link></li>
        <li className="tile"><Link onClick={redirect} to="/users"><FaUsers /></Link></li>
        <li className="tile"><Link onClick={redirect} to="/search"><FaSearch /></Link></li>
    </ul>
);

export default NavMain;
