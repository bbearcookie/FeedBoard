import React, { useEffect, useContext } from 'react';
import Dropdown from './dropdown/Dropdown';
import UserContext from '../contexts/user';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import useRequest from '../lib/useRequest';
import * as auth from '../lib/auth';
import classNames from 'classnames';
import './NavBar.scss';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const request = useRequest();
  const { user, logout } = useContext(UserContext);

  const onLogout = async () => {
    // await auth.logout(request);
    await logout(request);
    return navigate("/");
  }

  return (
    <section className="NavBar">
      <nav>
        <Link className="nav-logo" to="/">FeedBoard</Link>
        <div className="nav-items">
          {user.username ?
          <>
            <NavLink className="nav-item" to="/">메인</NavLink>
            <NavLink className="nav-item" to="/writer">
              <FontAwesomeIcon icon={faEdit} />
              <p className="label">글쓰기</p>
            </NavLink>
            <Dropdown
              className={classNames({"active": new RegExp(user.username).exec(location.pathname)})}
              dropdownBtn={<div>{user.nickname}</div>}
            >
              <Link className="Dropdown-item" to={"/user/" + user.username}>마이 페이지</Link>
              <Link className="Dropdown-item" to="./" onClick={onLogout}>로그아웃</Link>
            </Dropdown>
          </> :
          <>
            <NavLink className="nav-item" to="/">메인</NavLink>
            <NavLink className="nav-item" to="/signin">로그인</NavLink>
            <NavLink className="nav-item" to="/signup">회원가입</NavLink>
          </>}
        </div>
      </nav>
    </section>
  );
};

export default NavBar;