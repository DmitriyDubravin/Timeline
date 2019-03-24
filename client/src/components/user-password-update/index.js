import { compose } from 'services/functional.service';
import {connect as withProps} from 'react-redux';
import connections from './connector';
import UserPasswordUpdate from './user-password-update';

export default compose(
    withProps(...connections)
)(UserPasswordUpdate);
