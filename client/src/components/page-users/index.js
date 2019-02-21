import { compose } from 'services/functional.service';
import {connect as withProps} from 'react-redux';
import connections from './connector';
import PageUsers from './page-users';

export default compose(
    withProps(...connections)
)(PageUsers);
