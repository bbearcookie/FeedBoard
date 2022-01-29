import React from 'react';
import { Link } from 'react-router-dom';
import { faAddressCard, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import NavBar from '../components/NavBar';
import Input from '../components/Input';
import Button from '../components/Button';
import './Signup.scss';

const Signup = () => {
  return (
    <div className="Signup">
      <NavBar />
      <div className="main-area">
        <p className="title-label">회원가입</p>
        <Link className="signin-link" to="/signin">이미 가입하셨나요?</Link>
        <Input
          type="text"
          name="username"
          icon={faAddressCard}
          placeholder="아이디"
          autoComplete="off"
        />
        <Input
          type="text"
          name="nickname"
          icon={faUser}
          placeholder="닉네임"
          autoComplete="off"
        />
        <Input
          type="password"
          name="password"
          icon={faLock}
          placeholder="비밀번호"
          autoComplete="off"
        />
        <Input
          type="password"
          name="password_check"
          icon={faLock}
          placeholder="비밀번호 재확인"
          autoComplete="off"
        />
        <Button>전송</Button>
      </div>
    </div>
  );
};

export default Signup;