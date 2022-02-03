import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import useRequest from '../lib/useRequest';
import * as api from '../lib/api';
import './NavBar.scss';

const NavBar = () => {
  const request = useRequest();
  const navigate = useNavigate();

  let user = sessionStorage.getItem('user');
  if (user) user = JSON.parse(user);

  const onLogout = async () => {
    try {
      const data = await request.call(api.postLogout);
      sessionStorage.removeItem('user');
      return navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section className="NavBar">
      <nav>
        <Link className="nav-logo" to="/">FeedBoard</Link>
        <div className="nav-items">
          {user ?
          <>
            <div>{user.username}</div>
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

// NavBar.defaultProps = {
//   username: ''
// };

export default NavBar;