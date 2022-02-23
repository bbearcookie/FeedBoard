import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import classNames from 'classnames';
import './PageTemplate.scss';

const PageTemplate = ({ className, children }) => {
  return (
    <>
      <div className={classNames("PageTemplate", className)}>
        <NavBar />
        {children}
      </div>
      <Footer />
    </>
  );
};

export default PageTemplate;