import React from 'react';
import TrendTagList from '../components/home/TrendTagList';
import HomeTitleBar from '../components/home/HomeTitleBar';
import TagTabContainer from '../containers/home/TagTabContainer';
import TagSearchBarContainer from '../containers/home/TagSearchBarContainer';
import PageTemplate from '../templates/PageTemplate';
import qs from 'qs';
import './Home.scss';
import PostList from '../components/home/PostList';
import * as api from '../lib/api';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  return (
    <PageTemplate className="Home">
      <HomeTitleBar />
      <section className="main-area">
        <section className="post-area">
          <TagTabContainer />
          <PostList api={api.getPosts} params={{tag: query.tag}} />
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