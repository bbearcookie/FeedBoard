import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/input/Button';
import SignupForm from '../components/sign/SignupForm';
import PageTemplate from '../templates/PageTemplate';
import SignTemplate from '../templates/SignTemplate';
import * as api from '../lib/api';
import './Signup.scss';

const Signup = () => {
  return (
    <PageTemplate className="Signup">
      <SignTemplate>
        <div className="main-area">
          <p className="title-label">회원가입</p>
          <Link className="link" to="/signin">이미 가입하셨나요?</Link>
          <SignupForm />
          <a href={api.kakaoLogin}>
            <Button className="kakao-button" theme="kakao">카카오로 로그인</Button>
          </a>
        </div>
      </SignTemplate>
    </PageTemplate>
  );
};

export default Signup;