import React from 'react';
import { Link } from 'react-router-dom';
import './Signin.scss';
import SignTemplate from '../components/sign/SignTemplate';
import SigninForm from '../components/sign/SigninForm';
import NavBar from '../components/NavBar';

const Signin = () => {
  return (
    <SignTemplate>
      <NavBar />
      <div className="main-area">
        <p className="title-label">로그인</p>
        <Link className="link" to="/signup">가입이 필요하신가요?</Link>
        <SigninForm />
      </div>
    </SignTemplate>
  );
};

export default Signin;