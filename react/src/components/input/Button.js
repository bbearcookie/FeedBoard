import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Button.scss';

const Button = ({ className, type, theme, icon, onClick, children }) => {
  return (
    <button
      className={classNames("Button", className, theme)}
      type={type}
      onClick={onClick}
    >
      {icon ?
        <FontAwesomeIcon
        className="icon"
        size="sm"
        icon={icon}
      />
      : null}
      {children}
    </button>
  );
};

Button.defaultProps = {
  className: '',
  type: 'button',
  theme: 'primary',
  icon: null,
  onClick: () => {}
};

export default Button;