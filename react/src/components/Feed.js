import React from 'react';
import './Feed.scss';

const Feed = () => {
  return (
    <article className="Feed">
      <div className="top-area">
        <div className="user-area">
          <img
            src="/bears.jpg"
            width="50px"
            height="50px"
            alt="user-img"
          />
          <div className="name-time-area">
            <p className="author">닉네임</p>
            <p className="written-time">2021년 1월 25일</p>
          </div>
        </div>
        <div className="button-area">
          <item>댓글</item>
          <item>하트</item>
        </div>
      </div>
      <div className="content-area">
        <h1>제목</h1>
        <p>오늘은 이러한 글을 써볼까 합니다.... 내용..</p>
      </div>
      <item className="divider" />
    </article>
  );
};

export default Feed;