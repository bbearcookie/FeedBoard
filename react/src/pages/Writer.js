import React from 'react';
import PageTemplate from '../templates/PageTemplate';
import Button from '../components/Button';
import Input from '../components/Input';
import './Writer.scss';
import Textarea from '../components/Textarea';

const Writer = () => {

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("onSubmit");
  };

  return (
    <PageTemplate className="Writer">
      <form className="main-area">
        <h1 className="title-label">글쓰기</h1>
        <label className="label">제목</label>
        <Input name="title" placeholder="제목을 입력해주세요" />
        <label className="label">내용</label>
        <Textarea
          className="Input textarea"
          placeholder="내용을 입력해주세요"
        />
        <div className="button-area">
          <Button type="button" theme="secondary">취소</Button>
          <Button type="submit" onClick={onSubmit}>완료</Button>
        </div>
      </form>
    </PageTemplate>
  );
};

export default Writer;