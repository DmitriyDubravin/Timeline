import { compose } from './../../services/functional.service';
import {connect as withProps} from 'react-redux';
import connections from './connector';
import DateString from './date-string';

export default compose(
    withProps(...connections)
)(DateString);
