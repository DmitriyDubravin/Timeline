import React from 'react';
import {connect} from 'react-redux';

export default function ConditionalRender(COMPONENT, condition) {
    let mapState = condition => state => ({mount: condition(state)});
    return connect(mapState(condition))(props => props.mount ? <COMPONENT {...props} /> : null);
}
