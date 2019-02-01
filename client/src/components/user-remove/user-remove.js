import React, { useState } from 'react';
import { Input, Button } from '../forms';

const UserRemove = ({
    remove
}) => {

    const [ password, setPassword ] = useState('');

    const submitHandler = e => {
        e.preventDefault();
        const isValid = true; // TODO: create local validation logic
        if (isValid) {
            remove();
        }
    }

    return (
        <form className="user-delete-form" onSubmit={submitHandler}>
            <h3>Remove me</h3>
            <Input value={password} onChange={setPassword} type="password" placeholder="Password" />
            <Button value="Delete" />
        </form>
    )
}

export default UserRemove;
