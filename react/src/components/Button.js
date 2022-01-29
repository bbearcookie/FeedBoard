import React from 'react';
import './Button.scss';

const Button = ({ children }) => {
  return (
    <button className="Button" type="button">
      {children}
    </button>
  );
};

export default Button;