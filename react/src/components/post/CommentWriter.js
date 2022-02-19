import React, { useState } from 'react';
import TextArea from '../input/Textarea';
import classNames from 'classnames';
import LoadingSpinner from '../LoadingSpinner';
import './CommentWriter.scss';
import Button from '../input/Button';
import useRequest from '../../lib/useRequest';
import * as api from '../../lib/api';
import { useNavigate, useParams } from 'react-router-dom';

const CommentWriter = ({ nickname }) => {
  const { postNo } = useParams();
  const [focus, setFocus] = useState(false);
  const [content, setContent] = useState('');
  const request = useRequest();
  const navigate = useNavigate();

  const onFocus = () => setFocus(true);
  const onBlur = () => setFocus(false);

  const onChange = (e) => {
    setContent(e.target.value);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!content) {
      return;
    }

    try {
      const data = await request.call(api.postComment, postNo, content);
      console.log(data);
      return navigate(0);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form
      className={classNames("CommentWriter", {"focus": focus})}
      onSubmit={onSubmit}
    >
      <TextArea placeholder="댓글을 입력해주세요" onFocus={onFocus} onBlur={onBlur} onChange={onChange}/>
      <div className="bottom-area">
        <img
          src="/user.png"
          width="40px"
          height="40px"
          alt="user-img"
        />
        <p className="nickname">{nickname}</p>
        <div className="right-area">
          {request.loading && <LoadingSpinner />}
          <Button type="submit">작성</Button>
        </div>
      </div>
    </form>
  );
};

CommentWriter.defaultProps = {
  nickname: ''
};

export default CommentWriter;