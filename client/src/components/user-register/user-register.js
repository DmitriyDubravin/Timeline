import React, { useState } from 'react';
import { Input, Button } from 'components/forms';

const UserRegister = ({
    register
}) => {

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const submitHandler = e => {
        e.preventDefault();
        const isValid = true; // TODO: create local validation logic
        if (isValid) {
            register({ name, email, password });
        }
    }

    return (
        <form className="regisster-form" onSubmit={submitHandler}>
            <Input placeholder="Name" value={name} onChange={setName} />
            <Input placeholder="E-mail" value={email} type="email" onChange={setEmail} />
            <Input placeholder="Password" value={password} type="password" onChange={setPassword} />
            <Button value="Register" />
        </form>
    )
}

export default UserRegister;
