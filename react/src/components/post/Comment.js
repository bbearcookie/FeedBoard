import React, { useState, useCallback } from 'react';
import Dropdown from '../dropdown/Dropdown';
import CommentWriter from './CommentWriter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { BACKEND } from '../../lib/api';
import * as auth from '../../lib/auth';
import './Comment.scss';

const Comment = ({ commentNo, author, nickname, content, writtenTime, modifiedTime, modified, imgFileName }) => {
  const [modify, setModify] = useState(false);

  const onClickModify = useCallback(e => {
    setModify(!modify);
  }, [modify]);

  const onClickRemove = useCallback(e => {
    console.log('remove');
  }, []);

  return (
    <>
    {!modify ?
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
        <p className="written-time">{modified ? modifiedTime : writtenTime}</p>
        {modified ? <p className="written-time">(수정됨)</p> : null}
        <div className="right-area">
          {auth.getUsername() === author ? 
          <Dropdown
            type="hover"
            dropdownBtn={<FontAwesomeIcon className="option-btn" icon={faEllipsisV} />}
          >
            <div className="Dropdown-item" onClick={onClickModify}>수정</div>
            <div className="Dropdown-item" onClick={onClickRemove}>삭제</div>
          </Dropdown> : null}
        </div>
      </div>
    </div> :
    <CommentWriter
      value={content}
      commentNo={commentNo}
      nickname={nickname}
      imgFileName={imgFileName}
      onClickClose={onClickModify}
    />}
    </>
  );
};

Comment.defaultProps = {
  commentNo: 0,
  author: '',
  nickname: '',
  content: '',
  writtenTime: '',
  modifiedTime: '',
  imgFileName: '',
  modified: 0,
};

export default Comment;