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
          <p>게시글1</p>
          <p>게시글2</p>
          <p>게시글3</p>
        </section>
        <section className="side-area">
          <p>검색</p>
          <div>요즘 피드</div>
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