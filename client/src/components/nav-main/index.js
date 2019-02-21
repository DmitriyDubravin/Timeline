import { compose } from 'services/functional.service';
import {connect as withProps} from 'react-redux';
import connections from './connector';
import NavMain from './nav-main';

export default compose(
    withProps(...connections)
)(NavMain);