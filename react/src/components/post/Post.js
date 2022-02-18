import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Post.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faHeart } from '@fortawesome/free-solid-svg-icons';
import Tag from '../tag/Tag';
import classNames from 'classnames';
import * as auth from '../../lib/auth';
import TagContainer from '../../containers/TagContainer';

function dateFormat(date) {
  date = new Date(date);

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
}

const Post = ({ postNo, title, content, author, nickname, writtenTime, tags, favoriteUsers, onFavorite }) => {
  const [overflowed, setOverflowed] = useState(false);
  const contentRef = useRef(null);

  // 내용이 많아서 잘리면 내용 더보기 라벨을 보여줌.
  useEffect(() => {
    function isOverflown(e) {
      return e.scrollHeight > e.clientHeight || e.scrollWidth > e.clientWidth;
    }

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
            <Link className="author" to={`/user/${author}`}>
              <p>{nickname}</p>
            </Link>
            <p className="written-time">{dateFormat(writtenTime)}</p>
          </div>
        </div>
        <ul className="button-area">
          <li className="button">
            <FontAwesomeIcon icon={faCommentDots} />
            <p>100</p>
          </li>
          <li
            className={classNames(
              'button',
              {'active': favoriteUsers.includes(auth.getUsername())}
            )}
            onClick={() => onFavorite(postNo)}
          >
            <FontAwesomeIcon icon={faHeart} />
            <p>{favoriteUsers.length}</p>
          </li>
        </ul>
      </div>
      <Link className="content-area" to="/post">
        <h1 className="post-title">{title}</h1>
        <p ref={contentRef}>{content}</p>
        {overflowed ? <p className="overflow-label">내용 더 보기</p> : null}
      </Link>
      <div className="tag-area">
        {/* 메인 페이지에서만 태그 클릭시 태그탭에 추가시킴. */}
        {tags.map(tag => {
          if (window.location.pathname === '/')
            return (
              <TagContainer
                key={tag.sequence}
                value={tag.value}
              />
            );
          else return (
            <Tag
              key={tag.sequence}
              value={tag.value}
            />
          )}
        )}
      </div>
      <div className="divider" />
    </article>
  );
};

Post.defaultProps = {
  title: '제목',
  content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi deleniti nobis consequatur voluptates, a expedita, aut nulla optio temporibus iste cumque maiores fuga non. Consequuntur praesentium officiis ipsa culpa necessitatibus possimus, animi facilis amet ut non in impedit, facere dicta perspiciatis tempore, accusantium nobis? Beatae aliquam saepe illo, consequuntur aliquid voluptas cumque tempore labore ad culpa quod natus. Suscipit, ipsam.',
  author: '',
  nickname: '닉네임',
  writtenTime: '2021년 01월 25일',
  tags: [],
  favoriteUsers: [],
  onFavorite: () => {}
};

export default Post;