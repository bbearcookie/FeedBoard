import React, { useState, createRef, useMemo, useCallback, useRef } from 'react';
import PageTemplate from '../templates/PageTemplate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
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
    type: 'tag',
    name: 'tag',
    label: '태그',
    placeholder: '태그를 입력해주세요.',
    ref: createRef()
  },
  {
    id: 2,
    type: 'textarea',
    name: 'content',
    label: '내용',
    placeholder: '내용을 입력해주세요',
    ref: createRef()
  }
];

const Tag = ({ tag, onRemove }) => {
  const { id, value } = tag;

  return (
    <span className="tag" key={id}>
      <span className="sign">#</span>
      {value}
      <FontAwesomeIcon
        value={tag.id}
        className="close"
        icon={faTimes}
        onClick={() => onRemove(id)}
      />
    </span>
  );
}

// input의 type에 따라서 렌더링할 컴포넌트가 다르므로 래퍼로 묶어서 사용했음.
const InputWrapper = ({ form, setForm, tags, setTags, input, onChange }) => {
  const tagId = useRef(0);

  // 새 태그 추가하고 태그 input 초기화
  function addNewTag() {
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
                  {tags.map((tag) => (<Tag key={tag.id} tag={tag} onRemove={onTagRemove} />))}
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

    console.log(form);
    console.log(tags);

    // try {
    //   const data = await request.call(api.postWrite, form);
    //   setError(data.message); // 작성 성공
    // } catch (err) {
    //   if (err.response) {
    //     const { status, data } = err.response;
    //     const { message } = data;

    //     switch (status) {
    //       case 401:
    //         return setError(message);
    //       default:
    //         console.error(err);
    //         return setError('요청 오류');
    //     }
    //   }
    // }

  };

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
            onChange={onChange} />)
        }
        <div className="button-area">
          <Button type="button" theme="secondary">취소</Button>
          <Button type="submit">작성</Button>
        </div>
      </form>
    </PageTemplate>
  );
};

export default Writer;