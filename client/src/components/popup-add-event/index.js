import { compose } from './../../support/functions';
import {connect as withProps} from 'react-redux';
import connections from './connector';
import PopupAddEvent from './popup-add-event';

export default compose(
    withProps(...connections)
)(PopupAddEvent);