import { compose } from './../../services/functional.service';
import {connect as withProps} from 'react-redux';
import connections from './connector';
import Popups from './popups';

export default compose(
    withProps(...connections)
)(Popups);