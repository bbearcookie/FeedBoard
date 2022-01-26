import React from 'react';
import { Outlet } from 'react-router-dom';
import Feed from '../components/Feed';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
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
          <SearchBar />
          <div>최근 태그</div>
        </section>
      </section>
      <Outlet />
    </div>
  );
};

export default Home;