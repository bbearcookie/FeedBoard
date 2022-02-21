import React from 'react';
import classNames from 'classnames';
import './Dropdown.scss';

const Dropdown = ({ className, dropdownBtn, children }) => {
  return (
    <div className={classNames('Dropdown', className)}>
      <div className="Dropdown-btn">{dropdownBtn}</div>
      <div className="Dropdown-menu">
        {children}
      </div>
    </div>
  );
};

Dropdown.defaultProps = {
  dropdownBtn: <div></div>
};

export default Dropdown;