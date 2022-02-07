import React from 'react';
import classNames from 'classnames';
import './Button.scss';

const Button = ({ className, type, theme, onClick, children }) => {
  return (
    <button
      className={classNames("Button", className, theme)}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  className: '',
  type: 'button',
  theme: 'primary',
  onClick: () => {}
};

export default Button;