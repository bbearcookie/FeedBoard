import React from 'react';
import TitleBarTemplate from '../../templates/TitleBarTemplate';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import Button from '../input/Button';
import './UserTitleBar.scss';
import { Link, useParams } from 'react-router-dom';
import * as auth from '../../lib/auth';
import { BACKEND } from '../../lib/api';

const UserTitleBar = ({ user }) => {
  const { username } = useParams();

  return (
    <TitleBarTemplate className="UserTitleBar">
      <div className="user-area">
        <img
          className="user-icon"
          src={user.imgFileName ? `${BACKEND}/user/image/${user.imgFileName}` : '/user.png'}
          onError={(e) => e.target.src = '/user.png'}
          alt="사용자 아이콘"
        />
        <p className="nickname">{user.nickname}</p>
        <p className="introduce">{user.introduce}</p>
        {username === auth.getUsername() ?
        <Link className="edit-button" to="/setting/user">
          <Button theme="primary-outline" icon={faPen}>내 정보 수정</Button>
        </Link>
        : null}
      </div>
    </TitleBarTemplate>
  );
};

UserTitleBar.defaultProps = {
  user: {
    nickname: '닉네임',
    introduce: '한 줄 소개'
  }
};

export default UserTitleBar;