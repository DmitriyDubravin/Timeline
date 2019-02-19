import { compose } from './../../services/functional.service';
import {connect as withProps} from 'react-redux';
import connections from './connector';
import EventsList from './events-list';

export default compose(
    withProps(...connections)
)(EventsList);