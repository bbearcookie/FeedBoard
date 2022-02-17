import React, { useState, createRef, useMemo, useCallback, useRef } from 'react';
import PageTemplate from '../templates/PageTemplate';
import Tag from '../components/tag/Tag';
import Button from '../components/input/Button';
import Input from '../components/input/Input';
import Textarea from '../components/input/Textarea';
import * as api from '../lib/api';
import * as formUtil from '../lib/form';
import useRequest from '../lib/useRequest';
import { useNavigate } from 'react-router-dom';
import './Writer.scss';

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
  },
  {
    id: 2,
    type: 'tag',
    name: 'tag',
    label: '태그',
    placeholder: '태그를 입력해주세요.',
    ref: createRef()
  },
];

// input의 type에 따라서 렌더링할 컴포넌트가 다르므로 래퍼로 묶어서 사용했음.
const InputWrapper = ({ form, setForm, tags, setTags, input, onChange, setError }) => {
  const tagId = useRef(0);

  // 새 태그 추가하고 태그 input 초기화
  function addNewTag() {

    // 태그는 10개까지만 추가 가능
    if (tags.length >= 10) {
      window.scrollTo(0, 0);
      return setError('태그는 10개 까지만 사용할 수 있어요.');
    }

    // 아직 해당 태그 없을때만 추가함
    if (!tags.some(tag => tag.value === form['tag'])) {
      const newTag = {
        id: tagId.current,
        value: form['tag']
      };
      tagId.current++;
      setTags(tags.concat(newTag));
    }
    setForm({ ...form, 'tag': '' });
  }

  // 태그 input으로 엔터 입력시
  const onTagInputEnter = (e) => {
    if (e.which === 13) {
      e.preventDefault(); //  폼 전체가 submit 되는거 막음
      if (form['tag'] !== '')
        addNewTag();
    }
  }

  // 태그 추가 버튼 클릭시
  const onTagButtonClick = (e) => {
    if (form['tag'] !== '')
      addNewTag();
  }

  // 태그 삭제 버튼 클릭시
  const onTagRemove = (id) => {
    setTags(tags.filter((tag) => tag.id !== id));
  }

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
          case 'tag':
            return (
              <>
                <Input
                  name={input.name}
                  value={form[input.name]}
                  maxLength="30"
                  placeholder={input.placeholder}
                  inputRef={input.ref}
                  onChange={onChange}
                  onKeyPress={onTagInputEnter}
                  button={
                    <Button
                      className="tag_button"
                      theme="skyblue"
                      onClick={onTagButtonClick}
                    >추가</Button>}
                />
                <div className='tag_area'>
                  {tags.map((tag) => (<Tag key={tag.id} tagId={tag.id} value={tag.value} onRemove={onTagRemove} />))}
                </div>
              </>
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
  const [tags, setTags] = useState([]);
  const request = useRequest();
  const navigate = useNavigate();

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
      await request.call(api.postWrite, form, tags.map(tag => tag.value));
      return navigate('/');
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

  // 글 작성 취소 버튼 클릭시
  const onCancelClick = () => {
    return navigate(-1);
  }

  return (
    <PageTemplate className="Writer">
      <form className="main-area" onSubmit={onSubmit}>
        <h1 className="title-label">글쓰기</h1>
        {error ? <p className="error-message">{error}</p> : null}
        {inputs.map((input) =>
          <InputWrapper
            key={input.id}
            input={input}
            form={form}
            setForm={setForm}
            tags={tags}
            setTags={setTags}
            onChange={onChange}
            setError={setError} />)
        }
        <div className="button-area">
          <Button type="button" theme="secondary" onClick={onCancelClick}>취소</Button>
          <Button type="submit">작성</Button>
        </div>
      </form>
    </PageTemplate>
  );
};

export default Writer;