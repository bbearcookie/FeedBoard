import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import Feed from '../components/home/Feed';
import TagTab from '../components/home/TagTab';
import TrendTagList from '../components/home/TrendTagList';
import TitleBar from '../components/TitleBar';
import './Home.scss';

const Home = () => {
  return (
    <div className="Home">
      <NavBar />
      <TitleBar />
      <section className="main-area">
        <section className="feed-area">
          <TagTab />
          <Feed />
          <Feed />
          <Feed />
          <Feed />
        </section>
        <section className="side-area">
          <SearchBar />
          <TrendTagList />
        </section>
      </section>
      <Footer />
      <Outlet />
    </div>
  );
};

export default Home;