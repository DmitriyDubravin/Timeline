import { compose } from './../../support/functions';
import {connect} from 'react-redux';
import connections from './connector';
import EventsList from './events-list';

export default compose(
    connect(...connections)
)(EventsList);