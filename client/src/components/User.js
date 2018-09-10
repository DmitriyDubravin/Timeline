import React from 'react';
import {Link} from 'react-router-dom';

export default ({
        name
    }) => (
        <div className="user">
            <Link to={`/users/${name}`}>{name}</Link>
        </div>
    );
