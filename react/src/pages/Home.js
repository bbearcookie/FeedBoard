import React from 'react';
import { Outlet } from 'react-router-dom';
import Feed from '../components/Feed';
import FeedTab from '../components/FeedTab';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import TagList from '../components/TagList';
import TitleBar from '../components/TitleBar';
import './Home.scss';

const Home = () => {
  return (
    <div className="Home">
      <NavBar />
      <TitleBar />
      <section className="main-area">
        <section className="feed-area">
          <FeedTab />
          <Feed />
          <Feed />
          <Feed />
          <Feed />
        </section>
        <section className="side-area">
          <SearchBar />
          <TagList />
        </section>
      </section>
      <Footer />
      <Outlet />
    </div>
  );
};

export default Home;