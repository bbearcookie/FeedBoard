import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserTitleBar from '../components/user/UserTitleBar';
import useRequest from '../lib/useRequest';
import PageTemplate from '../templates/PageTemplate';
import * as api from '../lib/api';

const UserPage = () => {
  const { username } = useParams();
  const [nickname, setNickname] = useState('');
  const request = useRequest();

  useEffect(useCallback(async () => {
    const res = await request.call(api.getNickname, username);
    setNickname(res.nickname);
  }, [request, username]), []);

  return (
    <PageTemplate className="UserPage">
      <UserTitleBar nickname={nickname} />
    </PageTemplate>
  );
};

export default UserPage;