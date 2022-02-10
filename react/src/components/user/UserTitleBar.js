import React from 'react';
import TitleBarTemplate from '../../templates/TitleBarTemplate';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button';
import './UserTitleBar.scss';

const UserTitleBar = ({ username, nickname }) => {
  return (
    <TitleBarTemplate className="UserTitleBar">
      <div className="content-area">
        <img
          className="user-icon"
          src="/user.png"
          alt="사용자 아이콘"
        />
        <p className="nickname">{nickname}</p>
        <Button
          className="edit-button"
          theme="primary-outline"
          icon={faPen}
        >내 정보 수정</Button>
      </div>
    </TitleBarTemplate>
  );
};

UserTitleBar.defaultProps = {
  username: '',
  nickname: ''
};

export default UserTitleBar;