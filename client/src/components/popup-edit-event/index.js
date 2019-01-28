import { compose } from './../../support/functions';
import {connect as withProps} from 'react-redux';
import connections from './connector';
import PopupEditEvent from './popup-edit-event';

export default compose(
    withProps(...connections)
)(PopupEditEvent);