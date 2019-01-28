import { compose } from './../../support/functions';
import {connect as withProps} from 'react-redux';
import connections from './connector';
import FormEventEdit from './form-event-edit';

export default compose(
    withProps(...connections)
)(FormEventEdit);