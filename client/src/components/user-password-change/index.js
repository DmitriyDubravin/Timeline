import { compose } from './../../support/functions'; // TODO: from redux
import {connect as withProps} from 'react-redux';
import connections from './connector';
import UserPasswordChange from './user-password-change';

export default compose(
    withProps(...connections)
)(UserPasswordChange);
