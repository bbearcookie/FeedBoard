import React, { useState } from 'react';
import TextArea from '../input/Textarea';
import classNames from 'classnames';
import './CommentWriter.scss';
import Button from '../input/Button';

const CommentWriter = () => {
  const [focus, setFocus] = useState(false);

  const onFocus = () => setFocus(true);
  const onBlur = () => setFocus(false);

  return (
    <div className={classNames("CommentWriter", {"focus": focus})}>
      <TextArea placeholder="댓글을 입력해주세요" onFocus={onFocus} onBlur={onBlur}/>
      <div className="bottom-area">
        <img
          src="/user.png"
          width="40px"
          height="40px"
          alt="user-img"
        />
        <p className="nickname">닉네임</p>
        <div className="right-area">
          <Button>작성</Button>
        </div>
      </div>
    </div>
  );
};

export default CommentWriter;