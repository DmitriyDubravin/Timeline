import { compose } from 'services/functional.service';
import {connect as withProps} from 'react-redux';
import connections from './connector';
import PageUser from './page-user';

export default compose(
    withProps(...connections)
)(PageUser);
