import { compose } from 'services/functional.service';
import {connect as withProps} from 'react-redux';
import connections from './connector';
import PageChronometry from './page-chronometry';

export default compose(
    withProps(...connections)
)(PageChronometry);
