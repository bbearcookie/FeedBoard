import React, { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Dropdown from '../dropdown/Dropdown';
import TitleBarTemplate from '../../templates/TitleBarTemplate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { BACKEND } from '../../lib/api';
import * as auth from '../../lib/auth';
import './PostTitleBar.scss';

const PostTitleBar = ({ title, author, nickname, writtenTime, modified, modifiedTime, imgFileName }) => {
  const navigate = useNavigate();
  const { postNo } = useParams();

  const onClickModify = useCallback(e => {
    return navigate(`/writer/${postNo}`);
  }, [postNo]);

  const onClickRemove = useCallback(e => {
    console.log('remove');
  }, []);

  return (
    <TitleBarTemplate className="PostTitleBar">
      <div className="title-area">
        <h1 className="title-label">{title}</h1>
        <div className="author-area">
          <img
            src={imgFileName ? `${BACKEND}/user/image/${imgFileName}` : '/user.png'}
            onError={(e) => e.target.src = '/user.png'}
            width="50px"
            height="50px"
            alt="user-img"
          />
          <div className="name-time-area">
            <p className="nickname">{nickname}</p>
            <p className="written-time">{writtenTime} {modified ? `(수정: ${modifiedTime})` : null}</p>
          </div>
          <div className="right-area">
            {auth.getUsername() === author ?
            <Dropdown
              type="toggle"
              dropdownBtn={<FontAwesomeIcon icon={faEllipsisV} size="lg" />}
            >
              <div className="Dropdown-item" onClick={onClickModify}>게시글 수정</div>
              <div className="Dropdown-item" onClick={onClickRemove}>게시글 삭제</div>
            </Dropdown>
            : null}
          </div>
        </div>
      </div>
    </TitleBarTemplate>
  );
};

export default PostTitleBar;