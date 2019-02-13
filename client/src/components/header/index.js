import { compose } from './../../support/functions';
import {connect as withProps} from 'react-redux';
import connections from './connector';
import Header from './header';

export default compose(
    withProps(...connections)
)(Header);