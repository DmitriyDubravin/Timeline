import React from 'react';

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
