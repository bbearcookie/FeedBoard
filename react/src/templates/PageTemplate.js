import React from 'react';
import NavBar from '../components/NavBar';
import classNames from 'classnames';
import './PageTemplate.scss';

const PageTemplate = ({ className, children }) => {
  return (
    <div className={classNames("PageTemplate", className)}>
      <NavBar />
      {children}
    </div>
  );
};

export default PageTemplate;