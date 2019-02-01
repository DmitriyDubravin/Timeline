import { compose } from './../../support/functions';
import {connect as withProps} from 'react-redux';
import connections from './connector';
import UserRegister from './user-register';

export default compose(
    withProps(...connections)
)(UserRegister);