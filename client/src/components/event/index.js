import { compose } from 'services/functional.service';
import Event from './event';
import {connect as withProps} from 'react-redux';
import connections from './connector';

export default compose(
    withProps(...connections)
 )(Event);