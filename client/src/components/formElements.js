import React from 'react';

export const TextField = ({props: {name, placeholder, value, onChange, cls, msg}}) => {
    return (
        <div>
            <input
                className={cls}
                type="text"
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {msg && <div className="form-valid-msg">{msg}</div>}
        </div>
    );
}

export const PasswordField = ({props: {name, placeholder, value, onChange, cls, msg}}) => {
    return (
        <div>
            <input
                className={cls}
                type="password"
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {msg && <div className="form-valid-msg">{msg}</div>}
        </div>
    );
}

export const EmailField = ({props: {name, placeholder, value, onChange, cls, msg}}) => {
    return (
        <div>
            <input
                className={cls}
                type="email"
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {msg && <div className="form-valid-msg">{msg}</div>}
        </div>
    );
}

export const SubmitField = ({props: {name, placeholder, value, onChange, cls, disabled}}) => {
    return (
        <input
            className={cls}
            type="submit"
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
        />
    );
}
