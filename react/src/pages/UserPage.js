import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import UserTitleBar from '../components/titlebar/UserTitleBar';
import useRequest from '../lib/useRequest';
import qs from 'qs';
import PageTemplate from '../templates/PageTemplate';
import * as api from '../lib/api';
import "./UserPage.scss";
import UserTagTab from '../components/tag/tab/UserTagTab';
import PostList from '../components/post/PostList';

const UserPage = () => {
  const { username } = useParams();
  const location = useLocation();
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const [nickname, setNickname] = useState('');
  const request = useRequest();

  useEffect(useCallback(async () => {
    const res = await request.call(api.getNickname, username);
    setNickname(res.nickname);
  }, [request, username]), []);

  return (
    <PageTemplate className="UserPage">
      <UserTitleBar nickname={nickname} />
      <div className="main-area">
        <UserTagTab username={username} params={{ favorite: query.favorite }} />
        <PostList api={api.getPosts} params={{ username: username, favorite: query.favorite }} />
      </div>
    </PageTemplate>
  );
};

export default UserPage;