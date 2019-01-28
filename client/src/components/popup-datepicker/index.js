import { compose } from './../../support/functions';
import {connect as withProps} from 'react-redux';
import connections from './connector';
import PopupDatepicker from './popup-datepicker';

export default compose(
    withProps(...connections)
)(PopupDatepicker);