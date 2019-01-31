import { compose } from './../../support/functions';
import {connect as withProps} from 'react-redux';
import connections from './connector';
import EventDelete from './event-delete';

export default compose(
    withProps(...connections)
)(EventDelete);