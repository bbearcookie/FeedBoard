import React from 'react';
import TrendTagList from '../components/home/TrendTagList';
import HomeTitleBar from '../components/home/HomeTitleBar';
import TagTabContainer from '../containers/home/TagTabContainer';
import TagSearchBarContainer from '../containers/home/TagSearchBarContainer';
import PageTemplate from '../templates/PageTemplate';
import './Home.scss';
import PostList from '../components/home/PostList';

const Home = () => {
  return (
    <PageTemplate className="Home">
      <HomeTitleBar />
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
    </PageTemplate>
  );
};

export default Home;