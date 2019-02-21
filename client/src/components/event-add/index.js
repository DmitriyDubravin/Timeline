import { compose } from 'services/functional.service';
import {connect as withProps} from 'react-redux';
import connections from './connector';
import EventAdd from './event-add';

export default compose(
    withProps(...connections)
)(EventAdd);