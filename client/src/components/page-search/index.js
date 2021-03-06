import { compose } from 'services/functional.service';
import {connect as withProps} from 'react-redux';
import connections from './connector';
import PageSearch from './page-search';

export default compose(
    withProps(...connections)
)(PageSearch);
