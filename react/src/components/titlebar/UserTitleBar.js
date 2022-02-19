import React from 'react';
import TitleBarTemplate from '../../templates/TitleBarTemplate';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import Button from '../input/Button';
import './UserTitleBar.scss';
import { Link, useParams } from 'react-router-dom';
import * as auth from '../../lib/auth';

const UserTitleBar = ({ nickname }) => {
  const { username } = useParams();

  return (
    <TitleBarTemplate className="UserTitleBar">
      <div className="user-area">
        <img
          className="user-icon"
          src="/user.png"
          alt="사용자 아이콘"
        />
        <p className="nickname">{nickname}</p>
        <p className="introduce">제 한줄 소개는 이렇게 작성해볼겁니다</p>
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
  nickname: ''
};

export default UserTitleBar;