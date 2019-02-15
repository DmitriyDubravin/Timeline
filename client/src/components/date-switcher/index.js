import { compose } from './../../support/functions';
import {connect as withProps} from 'react-redux';
import connections from './connector';
import DateSwitcher from './date-switcher';

export default compose(
    withProps(...connections)
)(DateSwitcher);