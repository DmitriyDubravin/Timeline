import { compose } from './../../support/functions';
import {connect as withProps} from 'react-redux';
import connections from './connector';
import NavUser from './nav-user';

export default compose(
    withProps(...connections)
)(NavUser);