import React, { useState, createRef, useMemo, useCallback } from 'react';
import PageTemplate from '../templates/PageTemplate';
import Button from '../components/Button';
import Input from '../components/Input';
import * as api from '../lib/api';
import * as formUtil from '../lib/form';
import './Writer.scss';
import Textarea from '../components/Textarea';
import useRequest from '../lib/useRequest';

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
const InputWrapper = ({ form, input, onChange }) => {
  return (
    <>
      <label className="label">{input.label}</label>
      {(() => {
        switch (input.type) {
          case 'text':
            return (
              <Input
                name={input.name}
                value={form[input.name]}
                placeholder={input.placeholder}
                inputRef={input.ref}
                onChange={onChange}
              />
            );
          case 'textarea':
            return (
              <Textarea
                name={input.name}
                className="Input"
                placeholder={input.placeholder}
                inputRef={input.ref}
                onChange={onChange}
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
  const [form, setForm] = useState(useMemo(() => formUtil.getInitialValues(inputs), []));
  const request = useRequest();

  // 폼 변경시 상태 업데이트
  const onChange = useCallback((e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }, [form]);

  // 폼 전송 처리
  const onSubmit = async (e) => {
    e.preventDefault();

    let name = 'title';
    if (form[name] === '') {
      setError('제목이 비어있어요.');
      return formUtil.focus(inputs, name);
    }

    name = 'content';
    if (form[name] === '') {
      setError('내용이 비어있어요.');
      return formUtil.focus(inputs, name);
    }

    try {
      const data = await request.call(api.postWrite, form);
      setError(data.message); // 작성 성공
    } catch (err) {
      if (err.response) {
        const { status, data } = err.response;
        const { message } = data;

        switch (status) {
          case 401:
            return setError(message);
          default:
            console.error(err);
            return setError('요청 오류');
        }
      }
    }
  };

  return (
    <PageTemplate className="Writer">
      <form className="main-area" onSubmit={onSubmit}>
        <h1 className="title-label">글쓰기</h1>
        {error ? <p className="error-message">{error}</p> : null}
        {inputs.map((input) => <InputWrapper key={input.id} form={form} input={input} onChange={onChange} />) }
        <div className="button-area">
          <Button type="button" theme="secondary">취소</Button>
          <Button type="submit">작성</Button>
        </div>
      </form>
    </PageTemplate>
  );
};

export default Writer;