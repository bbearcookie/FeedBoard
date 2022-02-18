import React from 'react';
import './Comment.scss';

const Comment = () => {
  return (
    <div className="Comment">
      <div className="content-area">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam consequatur aut accusantium, fugiat ex quae esse voluptatum adipisci nihil dolor optio tenetur cumque reiciendis provident architecto fugit est doloribus. Iusto.
      </div>
      <div className="bottom-area">
        <img
          src="/user.png"
          width="40px"
          height="40px"
          alt="user-img"
        />
        <p className="nickname">닉네임</p>
        <p className="written-time">2022년 2월 18일</p>
      </div>
    </div>
  );
};

export default Comment;