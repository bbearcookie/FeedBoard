import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Feed from '../components/home/Feed';
import TrendTagList from '../components/home/TrendTagList';
import TitleBar from '../components/TitleBar';
import './Home.scss';
import TagTabContainer from '../containers/home/TagTabContainer';
import TagSearchBarContainer from '../containers/home/TagSearchBarContainer';

const Home = () => {
  return (
    <div className="Home">
      <NavBar />
      <TitleBar />
      <section className="main-area">
        <section className="feed-area">
          <TagTabContainer />
          <Feed />
          <Feed />
          <Feed />
          <Feed />
        </section>
        <section className="side-area">
          <TagSearchBarContainer />
          <TrendTagList />
        </section>
      </section>
      <Footer />
    </div>
  );
};

export default Home;