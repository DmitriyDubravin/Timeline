import { compose } from './../../support/functions';
import {connect as withProps} from 'react-redux';
import connections from './connector';
import EventRemove from './event-remove';

export default compose(
    withProps(...connections)
)(EventRemove);