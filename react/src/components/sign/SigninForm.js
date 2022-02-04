import React, { useState, useCallback, createRef, useEffect } from 'react';
import useRequest from '../../lib/useRequest';
import { faAddressCard, faLock } from '@fortawesome/free-solid-svg-icons';
import SignForm from './SignForm';
import * as auth from '../../lib/auth';
import { useNavigate } from 'react-router-dom';

const inputs = [
  {
    id: 0,
    type: 'text',
    name: 'username',
    placeholder: '아이디',
    icon: faAddressCard,
    ref: createRef()
  },
  {
    id: 1,
    type: 'password',
    name: 'password',
    placeholder: '비밀번호',
    icon: faLock,
    ref: createRef()
  }
];

const SigninForm = () => {
  const [error, setError] = useState(''); // 화면에 보여줄 오류 메시지
  const request = useRequest();
  const navigate = useNavigate();

  // 폼 전송 처리
  const onSubmit = useCallback(async (e) => {
    e.preventDefault();

    // 유효성 검사 에러 메시지 설정 후 해당 input을 focus시킴.
    function setErrorAndFocus(error, fieldName) {
      setError(error);
      inputs.find(input => input.name === fieldName).ref.current.focus();
    }

    // 폼 내용
    const form = {};
    inputs.forEach(input => form[input.name] = e.target[input.name].value);

    // 이미 로그인 되어있으면 return.
    if (auth.getUser()) return setError('이미 로그인 되어있어요.');

    try {
      setError('');
      await auth.login(request, form);
      return navigate("/"); // redirect
    } catch (err) {
      if (err.response) {
        const { status, data } = err.response;
        const { message, field, nickname } = data;

        switch (status) {
          case 400: // 이미 로그인 되어있는 경우
            auth.setUser(nickname);
            return navigate('/');
          case 401:
            return setErrorAndFocus(message, field);
          default:
            break;
        }
      }
      return setError('요청 오류');
    }

  }, [request, navigate]);

  return (
    <SignForm
      inputs={inputs}
      request={request}
      error={error}
      onSubmit={onSubmit}
    />
  );
};

export default SigninForm;