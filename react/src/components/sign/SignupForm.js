import React, { createRef, useCallback, useState, useMemo, useContext } from 'react';
import UserContext from '../../contexts/user';
import SignForm from './SignForm';
import { faAddressCard, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import useRequest from '../../lib/useRequest';
import * as api from '../../lib/api';
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
  const [form, setForm] = useState(useMemo(() => formUtil.getInitialValues(inputs), []));
  const { user, login } = useContext(UserContext);
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
    if (user.username) return setError('로그인이 되어있는 상태에는 가입할 수 없어요.');
    
    let name = 'username';
    if (form[name] === '') {
      setError('아이디가 비어있어요.');
      return formUtil.focus(inputs, name);
    }
    if (/[^a-zA-Z0-9]/.exec(form[name]) || form[name].length > 20) {
      setError('아이디는 영어와 숫자를 포함해서 20글자까지 입력할 수 있어요.');
      return formUtil.focus(inputs, name);
    }

    name = 'password';
    if (form[name] === '') {
      setError('비밀번호가 비어있어요.');
      return formUtil.focus(inputs, name);
    }

    name = 'passwordConfirm';
    if (form[name] === '') {
      setError('비밀번호 재확인이 비어있어요.');
      return formUtil.focus(inputs, name);
    }
    if (form.password !== form.passwordConfirm) {
      setError('비밀번호가 일치하지 않아요.');
      return formUtil.focus(inputs, name);
    }

    name = 'nickname';
    if (form[name] === '') {
      setError('닉네임이 비어있어요.');
      return formUtil.focus(inputs, name);
    }
    if (/[^a-zA-Z0-9가-힣]/.exec(form[name]) || form[name].length > 20) {
      setError('닉네임은 한글, 영어, 숫자를 포함해서 20글자까지 입력할 수 있어요.');
      return formUtil.focus(inputs, name);
    }
    
    try {
      await request.call(api.postSignup, form); // 회원가입 처리
      // await auth.login(request, form); // 로그인 처리
      await login(request, form);
      inputs.forEach(input => e.target[input.name].value = ''); // 폼 초기화
      return navigate('/'); // 메인 화면으로 리다이렉션
    } catch (err) {
      if (err.response) {
        const { status, data } = err.response;
        const { message } = data;

        switch (status) {
          case 400:
            return setError(message);
          case 409:
            const { field } = err.response.data;
            formUtil.focus(inputs, field);
            return setError(message);
          default:
            return setError('요청 오류');
        }
      }
    }
  }, [request, navigate, form, user, login]);

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

export default SignupForm;