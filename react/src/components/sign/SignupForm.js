import React, { createRef, useCallback, useState } from 'react';
import SignForm from './SignForm';
import { faAddressCard, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import useRequest from '../../lib/useRequest';
import * as api from '../../lib/api';
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
  },
  {
    id: 2,
    type: 'password',
    name: 'passwordConfirm',
    placeholder: '비밀번호 재확인',
    icon: faLock,
    ref: createRef()
  },
  {
    id: 3,
    type: 'text',
    name: 'nickname',
    placeholder: '닉네임',
    icon: faUser,
    ref: createRef()
  },
];

const SignupForm = () => {
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
    if (auth.getUser()) return setError('로그인이 되어있는 상태에는 가입할 수 없어요.');
    
    let name = 'username';
    if (form[name] === '')
      return setErrorAndFocus('아이디가 비어있어요.', name);
    if (/[^a-zA-Z0-9]/.exec(form[name]) || form[name].length > 20)
      return setErrorAndFocus('아이디는 영어와 숫자를 포함해서 20글자까지 입력할 수 있어요.', name);
    
    name = 'password';
    if (form[name] === '')
      return setErrorAndFocus('비밀번호가 비어있어요.', name);

    name = 'passwordConfirm';
    if (form[name] === '')
      return setErrorAndFocus('비밀번호 재확인이 비어있어요.', name);
    if (form.password !== form.passwordConfirm)
      return setErrorAndFocus('비밀번호가 일치하지 않아요.', name);

    name = 'nickname';
    if (form[name] === '')
      return setErrorAndFocus('닉네임이 비어있어요.', name);
    if (/[^a-zA-Z0-9가-힣]/.exec(form[name]) || form[name].length > 20)
      return setErrorAndFocus('닉네임은 한글, 영어, 숫자를 포함해서 20글자까지 입력할 수 있어요.', name);

    try {
      await request.call(api.postSignup, form); // 회원가입 처리
      await auth.login(request, form); // 로그인 처리
      inputs.forEach(input => e.target[input.name].value = ''); // 폼 초기화
      return navigate('/'); // 메인 화면으로 리다이렉션

    } catch (err) {
      if (err.response) {
        const { status, data } = err.response;
        const { message } = data;

        switch (status) {
          case 400:
            return setError(message);
          default:
            break;
        }

        if (err.response.status === 409) {
          const { message, field } = err.response.data;
          return setErrorAndFocus(message, field);
        }

      return setError('요청 오류');
      }
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

export default SignupForm;