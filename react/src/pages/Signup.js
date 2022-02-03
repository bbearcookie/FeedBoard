import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SignTemplate from '../components/sign/SignTemplate';
import SignupForm from '../components/sign/SignupForm';

const Signup = () => {
  return (
    <SignTemplate>
      <NavBar />
      <div className="main-area">
        <p className="title-label">회원가입</p>
        <Link className="link" to="/signin">이미 가입하셨나요?</Link>
        <SignupForm />
      </div>
    </SignTemplate>
  );
};

export default Signup;