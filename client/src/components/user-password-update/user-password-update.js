import React, { useState } from 'react';
import { Input, Button } from 'components/forms';

const UserPasswordUpdate = ({
    update
}) => {

    const [ password, setPassword ] = useState('');
    const [ newPassword, setNewPassword ] = useState('');

    const submitHandler = e => {
        e.preventDefault();
        const isValid = true; // TODO: create local validation logic
        if (isValid) {
            update({ password, newPassword });
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <h3>Update Password</h3>
            <Input placeholder="Current password" value={password} type="password" onChange={setPassword} />
            <Input placeholder="New password" value={newPassword} type="password" onChange={setNewPassword} />
            <Input placeholder="New password" value={newPassword} type="password" onChange={setNewPassword} />
            <Button value="Update Password" />
        </form>
    )
}

export default UserPasswordUpdate;
