import React from 'react';
import User from './../user';

export default ({
        usersList
}) => (
    <div className="users-list">
        {
            usersList.map(user => (
                <div className="user-item" key={user._id}>
                    <User {...user} />
                </div>
            ))
        }
    </div>
);
