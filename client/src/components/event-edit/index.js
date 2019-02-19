import { compose } from './../../services/functional.service';
import {connect as withProps} from 'react-redux';
import connections from './connector';
import EventEdit from './event-edit';

export default compose(
    withProps(...connections)
)(EventEdit);