import React from 'react';
import User from './User';

export default ({
        usersListData
    }) => (
        <div className="users-list">
            {
                usersListData.map(userData => (
                    <div className="user-item" key={userData._id}>
                        <User {...userData} />
                    </div>
                ))
            }
        </div>
    );
