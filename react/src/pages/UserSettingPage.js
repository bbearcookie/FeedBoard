import React, { createRef, useCallback, useMemo, useRef, useState } from 'react';
import Button from '../components/input/Button';
import Input from '../components/input/Input';
import PageTemplate from '../templates/PageTemplate';
import * as formUtil from '../lib/form';
import './UserSettingPage.scss';

const inputs = [
  {
    id: 0,
    type: 'file',
    name: 'imageFile',
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
  const onChangeImageFile = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setForm({ ...form, imageFile: file, previewURL: reader.result});
    };
    reader.readAsDataURL(file);
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
                    alt="사용자 아이콘"
                  />
                  <input
                    name="imageFile"
                    type="file"
                    accept=".jpg, .png"
                    ref={input.ref}
                    onChange={onChangeImageFile}
                  />
                  <div className="image-btn-area">
                    <Button className="image-button" theme="secondary">초기화</Button>
                    <Button className="image-button" onClick={onClickImageSelect}>업로드</Button>
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
  
  // 폼 변경시 상태 업데이트
  const onChange = useCallback((e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }, [form]);

  return (
    <PageTemplate className="UserSettingPage">
      <form className="main-area">
        <h1 className="title-label">프로필 수정</h1>

        {inputs.map(input => 
          <InputWrapper
            key={input.id}
            input={input}
            form={form}
            setForm={setForm}
            onChange={onChange}
          />
        )}

        {/* <label className="label">프로필 이미지</label>
        <div className="image-area">
          <img
            width="100px"
            height="100px"
            src={imageFile.previewURL}
            alt="사용자 아이콘"
          />
          <input
            name="imageFile"
            type="file"
            accept=".jpg, .png"
            ref={imageInputRef}
            onChange={onChangeImageFile}
          />
          <div className="image-btn-area">
            <Button className="image-button" theme="secondary">초기화</Button>
            <Button className="image-button" onClick={onClickImageSelect}>업로드</Button>
          </div>
        </div>
        <label className="label">닉네임</label>
        <Input placeholder="닉네임을 입력해주세요" />
        <label className="label">나의 소개</label>
        <Input placeholder="나의 소개를 입력해주세요" /> */}

        <div className="button-area">
          <Button type="button" theme="secondary">취소</Button>
          <Button>작성</Button>
        </div>
      </form>
    </PageTemplate>
  );
};

export default UserSettingPage;