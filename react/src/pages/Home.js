import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import TitleBar from '../components/TitleBar';

const Home = () => {
  return (
    <div>
      <NavBar />
      <TitleBar />
      <div style={{height: '100px'}} />
      <h1>제목</h1>
      <h2>h2</h2>
      <div>
        안녕하세요
      </div>
      <Outlet />
    </div>
  );
};

export default Home;