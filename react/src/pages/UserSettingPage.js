import React, { createRef, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import produce from 'immer';
import PageTemplate from '../templates/PageTemplate';
import Button from '../components/input/Button';
import Input from '../components/input/Input';
import LoadingSpinner from '../components/LoadingSpinner';
import useRequest from '../lib/useRequest';
import * as formUtil from '../lib/form';
import * as api from '../lib/api';
import * as auth from '../lib/auth';
import './UserSettingPage.scss';

const inputs = [
  {
    id: 0,
    type: 'file',
    name: 'image',
    label: '프로필 이미지',
    ref: createRef()
  },
  {
    id: 1,
    type: 'none',
    name: 'previewURL'
  },
  {
    id: 2,
    type: 'text',
    name: 'nickname',
    label: '닉네임',
    placeholder: '닉네임을 입력해주세요',
    ref: createRef()
  },
  {
    id: 3,
    type: 'text',
    name: 'introduce',
    label: '나의 소개',
    placeholder: '나의 소개를 입력해주세요',
    ref: createRef()
  },
];

const InputWrapper = ({ input, form, setForm, onChange }) => {
  // 이미지 파일 업로드시
  const onChangeImage = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setForm({ ...form, image: file, previewURL: reader.result});
    };
    reader.readAsDataURL(file);
  }

  // 이미지 파일 초기화 버튼 클릭시
  const onClickImageReset = (e) => {
    setForm({ ...form, image: '', previewURL: '/user.png', imageReset: true });
  }

  // 이미지 파일 업로드 버튼 클릭시
  const onClickImageSelect = (e) => {
    input.ref.current.click();
  };
  
  return (
    <>
      {input.label ? <label className="label">{input.label}</label> : null}
      {(() => {
        switch (input.type) {
          case 'file':
            return (
              <>
                <div className="image-area">
                  <img
                    width="100px"
                    height="100px"
                    src={form['previewURL'] ? form['previewURL'] : '/user.png'}
                    onError={(e) => e.target.src = '/user.png'}
                    alt="사용자 아이콘"
                  />
                  <input
                    name="image"
                    type="file"
                    accept=".jpg, .png"
                    ref={input.ref}
                    onChange={onChangeImage}
                  />
                  <div className="image-btn-area">
                    <Button
                      className="image-button"
                      theme="secondary"
                      onClick={onClickImageReset}
                    >초기화</Button>
                    <Button
                      className="image-button"
                      onClick={onClickImageSelect}
                    >업로드</Button>
                  </div>
                </div>
              </>
            );
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
          default:
            return null;
        }
      })()}
    </>
  )
};

const UserSettingPage = () => {
  const [form, setForm] = useState(useMemo(() => formUtil.getInitialValues(inputs), []));
  const navigate = useNavigate();
  const request = useRequest();
  
  // 폼 변경시 상태 업데이트
  const onChange = useCallback((e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }, [form]);

  // 페이지 로드시
  const onLoad = async () => {
    const data = await request.call(api.getLoggedUser);
    const { nickname, introduce, imgFileName } = data.user;

    setForm(produce(draft => {
      draft.nickname = nickname;
      draft.introduce = introduce;
      if (imgFileName) {
        draft.previewURL = `${api.BACKEND}/user/image/${imgFileName}`;
      } else {
        draft.previewURL = ''
      }
    }))
  }
  useEffect(() => {
    onLoad();
  }, []);

  // 폼 작성 취소시
  const onClickCancel = (e) => {
    return navigate(-1);
  }

  // 폼 전송시
  const onSubmit = async (e) => {
    e.preventDefault();
    await request.call(api.putLoggedUser, form);
    return navigate(`/user/${auth.getUsername()}`);
  }

  return (
    <PageTemplate className="UserSettingPage">
      <form className="main-area" onSubmit={onSubmit}>
        <h1 className="title-label">프로필 수정</h1>
        {request.loading ? <LoadingSpinner /> : null}

        {inputs.map(input => 
          <InputWrapper
            key={input.id}
            input={input}
            form={form}
            setForm={setForm}
            onChange={onChange}
          />
        )}

        <div className="button-area">
          <Button type="button" theme="secondary" onClick={onClickCancel}>취소</Button>
          <Button type="submit">작성</Button>
        </div>
      </form>
    </PageTemplate>
  );
};

export default UserSettingPage;