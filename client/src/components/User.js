import React from 'react';
import {Link} from 'react-router-dom';

export default ({
        user
    }) => (
        <div className="user">
            <Link to={`/users/${user}`}>{user}</Link>
        </div>
    );
