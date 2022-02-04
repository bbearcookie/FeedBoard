import React, { useEffect } from 'react';
import classNames from 'classnames';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import useRequest from '../lib/useRequest';
import * as auth from '../lib/auth';
import './NavBar.scss';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
            <NavLink className="nav-item" to="/">메인</NavLink>
            <NavLink className="nav-item" to="/writer">
              <FontAwesomeIcon icon={faEdit} />
              <p className="label">글쓰기</p>
            </NavLink>
            <div className={classNames("dropdown", {"active": /^\/mypage/.exec(location.pathname)})}>
              <p className="dropdown-btn">{user.nickname}</p>
              <div className="dropdown-items">
                <Link className="dropdown-item" to="/mypage">마이 페이지</Link>
                <Link className="dropdown-item" to="./" onClick={onLogout}>로그아웃</Link>
              </div>
            </div>
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