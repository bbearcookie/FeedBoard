import React from 'react';
import './Button.scss';

const Button = ({ type, children }) => {
  return (
    <button className="Button" type={type}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: 'button'
};

export default Button;