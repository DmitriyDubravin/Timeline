import { compose } from './../../support/functions';
import {connect as withProps} from 'react-redux';
import connections from './connector';
import PopupUserLogin from './popup-user-login';

export default compose(
    withProps(...connections)
)(PopupUserLogin);