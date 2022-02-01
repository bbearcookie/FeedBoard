import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import './Signin.scss';
import SignTemplate from '../components/sign/SignTemplate';
import SigninForm from '../components/sign/SigninForm';

const Signin = () => {
  return (
    <SignTemplate>
      <NavBar />
      <div className="main-area">
        <p className="title-label">로그인</p>
        <Link className="link" to="/signup">가입이 필요하신가요?</Link>
        <SigninForm />
        {/* <Input type="text" icon={faAddressCard} placeholder="아이디" />
        <Input type="password" icon={faLock} placeholder="비밀번호" />
        <Button>전송</Button> */}
      </div>
    </SignTemplate>
  );
};

export default Signin;