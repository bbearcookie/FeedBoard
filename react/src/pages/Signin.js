import React from 'react';
import { Link } from 'react-router-dom';
import SigninForm from '../components/sign/SigninForm';
import PageTemplate from '../templates/PageTemplate';
import SignTemplate from '../templates/SignTemplate';

const Signin = () => {
  return (
    <PageTemplate>
      <SignTemplate>
        <div className="main-area">
          <p className="title-label">로그인</p>
          <Link className="link" to="/signup">가입이 필요하신가요?</Link>
          <SigninForm />
        </div>
      </SignTemplate>
    </PageTemplate>
  );
};

export default Signin;