import React from 'react';
import {Link} from 'react-router-dom';

const User = ({
    name
}) => (
    <Link to={`/users/${name}`}>{name}</Link>
);

export default User;