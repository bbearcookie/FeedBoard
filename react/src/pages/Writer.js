import React, { useState, createRef } from 'react';
import PageTemplate from '../templates/PageTemplate';
import Button from '../components/Button';
import Input from '../components/Input';
import './Writer.scss';
import Textarea from '../components/Textarea';

const inputs = [
  {
    id: 0,
    type: 'text',
    name: 'title',
    label: '제목',
    placeholder: '제목을 입력해주세요',
    ref: createRef()
  },
  {
    id: 1,
    type: 'textarea',
    name: 'content',
    label: '내용',
    placeholder: '내용을 입력해주세요',
    ref: createRef()
  }
];

// input의 type에 따라서 렌더링할 컴포넌트가 다르므로 래퍼로 묶어서 사용했음.
const InputWrapper = ({ input }) => {
  return (
    <>
      <label className="label">{input.label}</label>
      {(() => {
        switch (input.type) {
          case 'text':
            return <Input name={input.name} placeholder={input.placeholder} />;
          case 'textarea':
            return (
              <Textarea
                name={input.name}
                className="Input"
                placeholder={input.placeholder}
              />
            );
          default:
            return null;
        }
      })()}
    </>
  );
};

const Writer = () => {
  const [error, setError] = useState('');

  // 폼 전송 처리
  const onSubmit = (e) => {
    e.preventDefault();
    
    let name = 'title';
    console.log(e.target[name].value);

    name = 'content';
    console.log(e.target[name].value);
  };

  return (
    <PageTemplate className="Writer">
      <form className="main-area" onSubmit={onSubmit}>
        <h1 className="title-label">글쓰기</h1>
        {error ? <p className="error-message">{error}</p> : null}
        {inputs.map((input) => <InputWrapper key={input.id} input={input} />) }
        <div className="button-area">
          <Button type="button" theme="secondary">취소</Button>
          <Button type="submit">작성</Button>
        </div>
      </form>
    </PageTemplate>
  );
};

export default Writer;