import { compose } from 'services/functional.service';
import {connect as withProps} from 'react-redux';
import connections from './connector';
import App from './app';

export default compose(
    withProps(...connections)
)(App);