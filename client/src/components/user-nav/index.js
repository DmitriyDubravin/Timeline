import { compose } from './../../support/functions';
import {connect as withProps} from 'react-redux';
import connections from './connector';
import UserNav from './user-nav';

export default compose(
    withProps(...connections)
)(UserNav);