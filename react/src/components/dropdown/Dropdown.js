import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import './Dropdown.scss';

// type은 toggle 방식과 hover 방식이 있음.
const Dropdown = ({ className, type, dropdownBtn, children }) => {
  const [toggle, setToggle] = useState(false);

  const onClickToggle = useCallback(e => {
    setToggle(!toggle);
  }, [toggle]);

  return (
    <div
      className={classNames(
        'Dropdown', className,
        {'hoverType': type === 'hover'},
        {'toggleType': type === 'toggle'},
        {'toggle': toggle}
      )}
    >
      <div className="Dropdown-btn" onClick={type === 'toggle' ? onClickToggle : null}>{dropdownBtn}</div>
      <div className="Dropdown-menu">
        {children}
      </div>
    </div>
  );
};

Dropdown.defaultProps = {
  type: 'hover',
  dropdownBtn: <div></div>
};

export default Dropdown;