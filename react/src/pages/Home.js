import React from 'react';
import Footer from '../components/Footer';
import Feed from '../components/home/Feed';
import TrendTagList from '../components/home/TrendTagList';
import TitleBar from '../components/TitleBar';
import './Home.scss';
import TagTabContainer from '../containers/home/TagTabContainer';
import TagSearchBarContainer from '../containers/home/TagSearchBarContainer';
import PageTemplate from '../templates/PageTemplate';

const Home = () => {
  return (
    <PageTemplate className="Home">
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
    </PageTemplate>
  );
};

export default Home;