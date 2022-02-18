import React from 'react';
import './Comment.scss';

const Comment = ({ author, nickname, content, writtenTime }) => {
  return (
    <div className="Comment">
      <div className="content-area">{content}</div>
      <div className="bottom-area">
        <img
          src="/user.png"
          width="40px"
          height="40px"
          alt="user-img"
        />
        <p className="nickname">{nickname}</p>
        <p className="written-time">{writtenTime}</p>
      </div>
    </div>
  );
};

Comment.defaultProps = {
  author: '',
  nickname: '',
  content: '',
  writtenTime: ''
};

export default Comment;