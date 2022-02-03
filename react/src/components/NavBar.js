import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import useRequest from '../lib/useRequest';
import * as auth from '../lib/auth';
import './NavBar.scss';

const NavBar = () => {
  const navigate = useNavigate();
  const request = useRequest();
  const user = auth.getUser();

  const onLogout = async () => {
    await auth.logout(request);
    return navigate("/");
  }

  return (
    <section className="NavBar">
      <nav>
        <Link className="nav-logo" to="/">FeedBoard</Link>
        <div className="nav-items">
          {user ?
          <>
            <div>{user.nickname}</div>
            <NavLink to="./" onClick={onLogout}>로그아웃</NavLink>
          </> :
          <>
            <NavLink to="/">메인</NavLink>
            <NavLink to="/signin">로그인</NavLink>
            <NavLink to="/signup">회원가입</NavLink>
          </>}
        </div>
      </nav>
    </section>
  );
};

export default NavBar;