import React from 'react';
import { Link } from 'react-router-dom';
import SignupForm from '../components/sign/SignupForm';
import PageTemplate from '../templates/PageTemplate';
import SignTemplate from '../templates/SignTemplate';

const Signup = () => {
  return (
    <PageTemplate>
      <SignTemplate>
        <div className="main-area">
          <p className="title-label">회원가입</p>
          <Link className="link" to="/signin">이미 가입하셨나요?</Link>
          <SignupForm />
        </div>
      </SignTemplate>
    </PageTemplate>
  );
};

export default Signup;