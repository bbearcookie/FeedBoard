import React from 'react';
import './Feed.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faHeart } from '@fortawesome/free-solid-svg-icons';

const Feed = () => {
  return (
    <article className="Feed">
      <div className="top-area">
        <div className="user-area">
          <img
            src="/bears.jpg"
            width="40px"
            height="40px"
            alt="user-img"
          />
          <div className="name-time-area">
            <p className="author">닉네임</p>
            <p className="written-time">2021년 01월 25일</p>
          </div>
        </div>
        <div className="button-area">
          <item className="button">
            <FontAwesomeIcon icon={faCommentDots} />
            <p>100</p>
          </item>
          <item className="button">
            <FontAwesomeIcon icon={faHeart} />
            <p>77</p>
          </item>
        </div>
      </div>
      <div className="content-area">
        <h1>제목</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi deleniti nobis consequatur voluptates, a expedita, aut nulla optio temporibus iste cumque maiores fuga non. Consequuntur praesentium officiis ipsa culpa necessitatibus possimus, animi facilis amet ut non in impedit, facere dicta perspiciatis tempore, accusantium nobis? Beatae aliquam saepe illo, consequuntur aliquid voluptas cumque tempore labore ad culpa quod natus. Suscipit, ipsam.</p>
        <div className="bottom-area">
          <p className="show-detail-label">자세히 보기</p>
          <div className="tag-area">
            <item>로아</item>
            <item>메이플</item>
            <item>던파</item>
          </div>
        </div>
      </div>
      <item className="divider" />
    </article>
  );
};

export default Feed;