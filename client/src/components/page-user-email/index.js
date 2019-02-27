import { compose } from 'services/functional.service';
import {connect as withProps} from 'react-redux';
import connections from './connector';
import PageUserEmail from './page-user-email';

export default compose(
    withProps(...connections)
)(PageUserEmail);
