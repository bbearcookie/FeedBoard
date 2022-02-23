import React, { useState, useCallback, useContext } from 'react';
import UserContext from '../../contexts/user';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../modal/Modal';
import Button from '../input/Button';
import Dropdown from '../dropdown/Dropdown';
import TitleBarTemplate from '../../templates/TitleBarTemplate';
import useRequest from '../../lib/useRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { BACKEND } from '../../lib/api';
import * as auth from '../../lib/auth';
import * as api from '../../lib/api';
import './PostTitleBar.scss';

const PostTitleBar = ({ title, author, nickname, writtenTime, modified, modifiedTime, imgFileName }) => {
  const [showModal, setShowModal] = useState(false);
  const { postNo } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const request = useRequest();

  const onClickModify = useCallback(e => {
    return navigate(`/writer/${postNo}`);
  }, [postNo]);

  const openRemoveModal = useCallback(e => {
    setShowModal(true);
  }, []);

  const closeRemoveModal = useCallback(e => {
    setShowModal(false);
  }, []);

  const onClickRemove = useCallback(async e => {
    await request.call(api.deletePost, postNo);
    closeRemoveModal();
    return navigate('/');
  }, []);

  return (
    <TitleBarTemplate className="PostTitleBar">
      {showModal ?
        <Modal title="게시글 삭제" setShow={setShowModal}>
          <div className="Modal-body">
            <p>게시글을 정말로 삭제하시겠어요?</p>
          </div>
          <div className="Modal-footer">
            <Button theme="secondary" onClick={closeRemoveModal}>취소</Button>
            <Button onClick={onClickRemove}>삭제</Button>
          </div>
        </Modal>
      : null}

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
            {user && user.username === author ?
            <Dropdown
              type="toggle"
              dropdownBtn={<FontAwesomeIcon icon={faEllipsisV} size="lg" />}
            >
              <div className="Dropdown-item" onClick={onClickModify}>게시글 수정</div>
              <div className="Dropdown-item" onClick={openRemoveModal}>게시글 삭제</div>
            </Dropdown>
            : null}
          </div>
        </div>
      </div>
    </TitleBarTemplate>
  );
};

export default PostTitleBar;