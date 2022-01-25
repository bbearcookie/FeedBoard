import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './NavBar.scss';

const NavBar = () => {
  return (
    <section className="NavBar">
      <nav>
        <item className="nav-logo">FeedBoard</item>
        <div className="nav-items">
          <NavLink to="/">메인</NavLink>
          <NavLink to="/signin">로그인</NavLink>
          <NavLink to="/signup">회원가입</NavLink>
        </div>
      </nav>
    </section>
  );
};

export default NavBar;