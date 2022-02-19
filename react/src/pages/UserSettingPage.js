import React from 'react';
import Button from '../components/input/Button';
import Input from '../components/input/Input';
import PageTemplate from '../templates/PageTemplate';
import './UserSettingPage.scss';

const UserSettingPage = () => {
  return (
    <PageTemplate className="UserSettingPage">
      <form className="main-area">
        <h1 className="title-label">프로필 수정</h1>
        <label className="label">프로필 이미지</label>
        <div className="image-area">
          <img
            className="user-icon"
            width="100px"
            height="100px"
            src="/user.png"
            alt="사용자 아이콘"
          />
          <div className="image-btn-area">
            <Button className="image-button" theme="secondary">초기화</Button>
            <Button className="image-button">업로드</Button>
          </div>
        </div>
        <label className="label">닉네임</label>
        <Input placeholder="닉네임을 입력해주세요" />
        <label className="label">나의 소개</label>
        <Input placeholder="나의 소개를 입력해주세요" />
        <div className="button-area">
          <Button type="button" theme="secondary">취소</Button>
          <Button>작성</Button>
        </div>
      </form>
    </PageTemplate>
  );
};

export default UserSettingPage;