import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
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

  const test = (e) => {
    e.preventDefault();
    console.log("test click!");
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
            <NavLink className="dropdown" to="/mypage" onClick={test}>
              <p className="dropdown-btn">{user.nickname}</p>
              <div className="dropdown-items">
                <Link className="dropdown-item" to="/mypage">마이 페이지</Link>
                <Link className="dropdown-item" to="./" onClick={onLogout}>로그아웃</Link>
              </div>
            </NavLink>
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