import React from 'react';
import TitleBarTemplate from '../../templates/TitleBarTemplate';
import './PostTitleBar.scss';

const PostTitleBar = ({ title, nickname, writtenTime }) => {
  return (
    <TitleBarTemplate className="PostTitleBar">
      <div className="title-area">
        <h1 className="title-label">{title}</h1>
        <div className="author-area">
          <img
            src="/user.png"
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