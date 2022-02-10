import React, { useEffect, useRef, useState } from 'react';
import './Post.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faHeart } from '@fortawesome/free-solid-svg-icons';
import Tag from '../Tag';
import classNames from 'classnames';

function dateFormat(date) {
  date = new Date(date);

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
}

const Post = ({ title, content, author, writtenTime, tags }) => {
  const [overflowed, setOverflowed] = useState(false);
  const contentRef = useRef(null);

  function isOverflown(e) {
    return e.scrollHeight > e.clientHeight || e.scrollWidth > e.clientWidth;
  }

  useEffect(() => {
    setOverflowed(isOverflown(contentRef.current));
  }, []);

  return (
    <article className="Post">
      <div className="top-area">
        <div className="user-area">
          <img
            src="/bears.jpg"
            width="40px"
            height="40px"
            alt="user-img"
          />
          <div className="name-time-area">
            <p className="author">{author}</p>
            <p className="written-time">{dateFormat(writtenTime)}</p>
          </div>
        </div>
        <ul className="button-area">
          <li className="button">
            <FontAwesomeIcon icon={faCommentDots} />
            <p>100</p>
          </li>
          <li className="button">
            <FontAwesomeIcon icon={faHeart} />
            <p>77</p>
          </li>
        </ul>
      </div>
      <div className="content-area">
        <h1 className="post-title">{title}</h1>
        <p ref={contentRef}>{content}</p>
        {overflowed ? <p className="overflow-label">내용 더 보기</p> : null}
        <div className="tag-area">
          {tags.map(tag =>
            <Tag
              key={tag.sequence}
              value={tag.value}
            />
          )}
        </div>
      </div>
      <div className="divider" />
    </article>
  );
};

Post.defaultProps = {
  title: '제목',
  content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi deleniti nobis consequatur voluptates, a expedita, aut nulla optio temporibus iste cumque maiores fuga non. Consequuntur praesentium officiis ipsa culpa necessitatibus possimus, animi facilis amet ut non in impedit, facere dicta perspiciatis tempore, accusantium nobis? Beatae aliquam saepe illo, consequuntur aliquid voluptas cumque tempore labore ad culpa quod natus. Suscipit, ipsam.',
  author: '닉네임',
  writtenTime: '2021년 01월 25일',
  tags: []
};

export default Post;