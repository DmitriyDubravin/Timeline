import React, { useState } from 'react';
import { Input, Button } from 'components/forms';

const UserLogin = ({
    login
}) => {

    const [ name, setName ] = useState('');
    const [ password, setPassword ] = useState('');

    const submitHandler = e => {
        e.preventDefault();
        const isValid = true; // TODO: create local validation logic
        if (isValid) {
            login({ name, password });
        }
    }

    return (
        <form className="login-form" onSubmit={submitHandler}>
            <Input placeholder="Name" value={name} onChange={setName} />
            <Input placeholder="Password" value={password} type="password" onChange={setPassword} />
            <Button value="Login" />
        </form>
    )
}

export default UserLogin;
