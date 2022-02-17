import React from 'react';
import TrendTagList from '../components/tag/TrendTagList';
import HomeTitleBar from '../components/titlebar/HomeTitleBar';
import TagTabContainer from '../containers/TagTabContainer';
import TagSearchBarContainer from '../containers/TagSearchBarContainer';
import PageTemplate from '../templates/PageTemplate';
import PostList from '../components/post/PostList';
import qs from 'qs';
import * as api from '../lib/api';
import { useLocation } from 'react-router-dom';
import './Home.scss';

const Home = () => {
  const location = useLocation();
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  return (
    <PageTemplate className="Home">
      <HomeTitleBar />
      <section className="main-area">
        <section className="post-area">
          <TagTabContainer params={{tag: query.tag}} />
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