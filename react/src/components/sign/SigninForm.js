import React, { useState, useCallback, createRef, useEffect, useMemo } from 'react';
import useRequest from '../../lib/useRequest';
import { faAddressCard, faLock } from '@fortawesome/free-solid-svg-icons';
import SignForm from './SignForm';
import * as auth from '../../lib/auth';
import * as formUtil from '../../lib/form';
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
  const [form, setForm] = useState(useMemo(() => formUtil.getInitialValues(inputs), []));
  const request = useRequest();
  const navigate = useNavigate();

  // 폼 변경시 상태 업데이트
  const onChange = useCallback((e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }, [form]);

  // 폼 전송 처리
  const onSubmit = useCallback(async (e) => {
    e.preventDefault();

    // 이미 로그인 되어있으면 return.
    if (auth.getUser()) return setError('이미 로그인 되어있어요.');

    let name = 'username';
    if (form[name] === '') {
      setError('아이디가 비어있어요.');
      return formUtil.focus(inputs, name);
    }

    name = 'password';
    if (form[name] === '') {
      setError('비밀번호가 비어있어요.');
      return formUtil.focus(inputs, name);
    }

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
            setError(message);
            return formUtil.focus(inputs, field);
          default:
            break;
        }
      }
      return setError('요청 오류');
    }

  }, [request, navigate, form]);

  return (
    <SignForm
      form={form}
      inputs={inputs}
      request={request}
      error={error}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default SigninForm;