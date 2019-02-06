import React from 'react';
import {Link} from 'react-router-dom';

const Button = ({
  value = 'Button',
  type = 'submit',
  className = 'button',
  to,
  onClick
}) => {
  const props = { type, className, to, onClick };
  return type !== 'link' ? (
    <input {...props} value={value} />
  ) : (
    <Link {...props}>{value}</Link>
  );
};

export default Button;
