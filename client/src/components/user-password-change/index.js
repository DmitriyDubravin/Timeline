import { compose } from 'services/functional.service';
import {connect as withProps} from 'react-redux';
import connections from './connector';
import UserPasswordChange from './user-password-change';

export default compose(
    withProps(...connections)
)(UserPasswordChange);
