import { compose } from 'services/functional.service';
import {connect as withProps} from 'react-redux';
import connections from './connector';
import UserLogin from './user-login';

export default compose(
    withProps(...connections)
)(UserLogin);
