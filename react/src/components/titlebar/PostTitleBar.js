import React from 'react';
import TitleBarTemplate from '../../templates/TitleBarTemplate';
import './PostTitleBar.scss';

const PostTitleBar = () => {
  return (
    <TitleBarTemplate className="PostTitleBar">
      <div className="title-area">
        <h1 className="title-label">게시글의 제목</h1>
        <div className="author-area">
          <img
            src="/user.png"
            width="50px"
            height="50px"
            alt="user-img"
          />
          <div className="name-time-area">
            <p className="nickname">닉네임</p>
            <p className="written-time">2022년 2월 17일</p>
          </div>
        </div>
      </div>
    </TitleBarTemplate>
  );
};

export default PostTitleBar;