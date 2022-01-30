import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import './Signup.scss';
import SignupFormContainer from '../containers/SignupFormContainer';

const Signup = () => {
  return (
    <div className="Signup">
      <NavBar />
      <div className="main-area">
        <p className="title-label">회원가입</p>
        <Link className="signin-link" to="/signin">이미 가입하셨나요?</Link>
        <SignupFormContainer />
      </div>
    </div>
  );
};

export default Signup;