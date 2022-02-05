import React from 'react';
import classNames from 'classnames';
import './Button.scss';

const Button = ({ className, type, onClick, children }) => {
  return (
    <button className={classNames("Button", className)} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  className: '',
  type: 'button',
  className: '',
  onClick: () => {}
};

export default Button;