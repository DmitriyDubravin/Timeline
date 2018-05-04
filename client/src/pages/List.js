import React from 'react';
import { renderRoutes } from 'react-router-config';

export default class extends React.Component {
    render() {
        return (
            <div>
                <h1>List page</h1>
                {renderRoutes(this.props.route.routes)}
            </div>
        )
    }
}
