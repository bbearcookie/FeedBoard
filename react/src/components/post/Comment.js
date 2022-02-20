import React from 'react';
import './Comment.scss';
import { BACKEND } from '../../lib/api';

const Comment = ({ author, nickname, content, writtenTime, imgFileName }) => {
  return (
    <div className="Comment">
      <div className="content-area">{content}</div>
      <div className="bottom-area">
        <img
          src={imgFileName ? `${BACKEND}/user/image/${imgFileName}` : '/user.png'}
          onError={(e) => e.target.src = '/user.png'}
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
  writtenTime: '',
  imgFileName: '',
};

export default Comment;