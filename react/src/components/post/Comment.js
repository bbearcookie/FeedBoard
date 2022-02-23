import React, { useState, useCallback, useContext } from 'react';
import UserContext from '../../contexts/user';
import { useNavigate } from 'react-router-dom';
import Button from '../input/Button';
import Dropdown from '../dropdown/Dropdown';
import Modal from '../modal/Modal';
import useRequest from '../../lib/useRequest';
import CommentWriter from './CommentWriter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { BACKEND } from '../../lib/api';
import * as auth from '../../lib/auth';
import * as api from '../../lib/api';
import './Comment.scss';

const Comment = ({ commentNo, author, nickname, content, writtenTime, modifiedTime, modified, imgFileName }) => {
  const [modify, setModify] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(UserContext);
  const request = useRequest();
  const navigate = useNavigate();

  // 댓글 수정 모드 on/off
  const onClickModify = useCallback(e => {
    setModify(!modify);
  }, [modify]);

  // 댓글 삭제 모달 열기
  const openModal = useCallback(e => {
    setShowModal(true);
  }, []);

  // 댓글 삭제 모달 닫기
  const closeModal = useCallback(e => {
    setShowModal(false);
  }, []);

  // 댓글 삭제 처리
  const onClickRemove = useCallback(async e => {
    await request.call(api.deleteComment, commentNo);
    setShowModal(false);
    return navigate(0);
  }, []);

  return (
    <>
    {!modify ?
    <div className="Comment">

      {showModal ?
      <Modal title="댓글 삭제" setShow={setShowModal}>
        <div className="Modal-body">
          <p>댓글을 정말로 삭제하겠어요?</p>
        </div>
        <div className="Modal-footer">
          <Button theme="secondary" onClick={closeModal}>취소</Button>
          <Button onClick={onClickRemove}>삭제</Button>
        </div>
      </Modal>
      : null}

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
          {user && user.username === author ? 
          <Dropdown
            type="hover"
            dropdownBtn={<FontAwesomeIcon icon={faEllipsisV} />}
          >
            <div className="Dropdown-item" onClick={onClickModify}>수정</div>
            <div className="Dropdown-item" onClick={openModal}>삭제</div>
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