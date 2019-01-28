import { compose } from './../../support/functions';
import {connect as withProps} from 'react-redux';
import connections from './connector';
import PopupDeleteEvent from './popup-delete-event';

export default compose(
    withProps(...connections)
)(PopupDeleteEvent);