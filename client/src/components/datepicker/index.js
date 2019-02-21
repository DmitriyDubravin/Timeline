import { compose } from 'services/functional.service';
import {connect as withProps} from 'react-redux';
import connections from './connector';
import Datepicker from './datepicker';

export default compose(
    withProps(...connections)
)(Datepicker);