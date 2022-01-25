import React from 'react';
import { Outlet } from 'react-router-dom';
import Feed from '../components/Feed';
import NavBar from '../components/NavBar';
import TitleBar from '../components/TitleBar';
import './Home.scss';

const Home = () => {
  return (
    <div className="Home">
      <NavBar />
      <TitleBar />
      <section className="main-area">
        <section className="feed-area">
          <Feed />
          <Feed />
          <Feed />
          <Feed />
        </section>
        <section className="side-area">
          <p>검색</p>
          <div>최근 태그</div>
        </section>
      </section>
      {/* <div style={{height: '100px'}} />
      <h1>제목</h1>
      <h2>h2</h2>
      <div>
        안녕하세요
      </div> */}
      <Outlet />
    </div>
  );
};

export default Home;