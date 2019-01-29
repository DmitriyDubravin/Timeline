import React, { useState } from 'react';
import { Input, Button } from './../forms';

const UserLogin = ({
    login
}) => {

    const [ name, setName ] = useState('');
    const [ password, setPassword ] = useState('');

    function submitHandler(e) {
        e.preventDefault();
        const isValid = true; // TODO: create local validation logic
        if (isValid) {
            login({
                login: name,
                password: password
            });
        }
    }

    return (
        <form className="login-form" onSubmit={submitHandler}>
            <Input placeholder="login" onChange={setName} />
            <Input placeholder="password" type="password" onChange={setPassword} />
            <Button value="Login" />
        </form>
    )
}

export default UserLogin;
