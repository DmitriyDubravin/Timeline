import { compose } from 'services/functional.service';
import {connect as withProps} from 'react-redux';
import connections from './connector';
import UserRemove from './user-remove';

export default compose(
    withProps(...connections)
)(UserRemove);
