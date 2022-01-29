import React from 'react';
import { Link } from 'react-router-dom';
import { faAddressCard, faLock } from '@fortawesome/free-solid-svg-icons';
import NavBar from '../components/NavBar';
import Input from '../components/Input';
import Button from '../components/Button';
import './Signin.scss';

const Signin = () => {
  return (
    <div className="Signin">
      <NavBar />
      <div className="main-area">
        <p className="title-label">로그인</p>
        <Link className="signup-link" to="/signup">가입이 필요하신가요?</Link>
        <Input type="text" icon={faAddressCard} placeholder="아이디" />
        <Input type="password" icon={faLock} placeholder="비밀번호" />
        <Button>전송</Button>
      </div>
    </div>
  );
};

export default Signin;