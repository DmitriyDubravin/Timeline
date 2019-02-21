import React, {Fragment} from 'react';
import MainLogo from 'components/main-logo/main-logo';
import { FaBars, FaUser } from 'react-icons/fa';

const Header = ({
    openPopupNavMain,
    openPopupNavUser
}) => (
    <Fragment>
        <button className="tile" onClick={openPopupNavMain}><FaBars /></button>
        <MainLogo />
        <button className="tile" onClick={openPopupNavUser}><FaUser /></button>
    </Fragment>
);

export default Header;
