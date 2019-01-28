import { compose } from './../../support/functions';
import {connect as withProps} from 'react-redux';
import connections from './connector';
import PopupMainNav from './popup-main-nav';

export default compose(
    withProps(...connections)
)(PopupMainNav);