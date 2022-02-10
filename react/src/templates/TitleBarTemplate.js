import React from 'react';
import classNames from 'classnames';
import './TitleBarTemplate.scss';

const TitleBarTemplate = ({ className, children }) => {
  return (
    <div className={classNames("TitleBarTemplate", className)}>
      {children}
    </div>
  );
};

export default TitleBarTemplate;