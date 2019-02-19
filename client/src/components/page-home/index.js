import { compose } from './../../services/functional.service';
import {connect as withProps} from 'react-redux';
import connections from './connector';
import PageHome from './page-home';

export default compose(
    withProps(...connections)
)(PageHome);
