import React from 'react';
import TitleBarTemplate from '../../templates/TitleBarTemplate';
import { BACKEND } from '../../lib/api';
import './PostTitleBar.scss';

const PostTitleBar = ({ title, nickname, writtenTime, imgFileName }) => {
  return (
    <TitleBarTemplate className="PostTitleBar">
      <div className="title-area">
        <h1 className="title-label">{title}</h1>
        <div className="author-area">
          <img
            src={imgFileName ? `${BACKEND}/user/image/${imgFileName}` : '/user.png'}
            onError={(e) => e.target.src = '/user.png'}
            width="50px"
            height="50px"
            alt="user-img"
          />
          <div className="name-time-area">
            <p className="nickname">{nickname}</p>
            <p className="written-time">{writtenTime}</p>
          </div>
        </div>
      </div>
    </TitleBarTemplate>
  );
};

export default PostTitleBar;