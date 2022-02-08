import React from 'react';
import Footer from '../components/Footer';
import TrendTagList from '../components/home/TrendTagList';
import TitleBar from '../components/TitleBar';
import TagTabContainer from '../containers/home/TagTabContainer';
import TagSearchBarContainer from '../containers/home/TagSearchBarContainer';
import PageTemplate from '../templates/PageTemplate';
import './Home.scss';
import PostList from '../components/home/PostList';

const Home = () => {
  return (
    <PageTemplate className="Home">
      <TitleBar />
      <section className="main-area">
        <section className="post-area">
          <TagTabContainer />
          <PostList />
        </section>
        <section className="side-area">
          <TagSearchBarContainer />
          <TrendTagList />
        </section>
      </section>
      {/* <Footer /> */}
    </PageTemplate>
  );
};

export default Home;