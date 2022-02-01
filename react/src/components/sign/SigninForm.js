import React, { useState, useCallback, createRef } from 'react';
import useRequest from '../../lib/useRequest';
import { faAddressCard, faLock } from '@fortawesome/free-solid-svg-icons';
import SignForm from './SignForm';
import * as api from '../../lib/api';

const inputs = [
  {
    id: 0,
    type: 'text',
    name: 'username',
    placeholder: '아이디',
    icon: faAddressCard
  },
  {
    id: 1,
    type: 'password',
    name: 'password',
    placeholder: '비밀번호',
    icon: faLock
  }
];

const SigninFormContainer = () => {
  const [error, setError] = useState(''); // 화면에 보여줄 오류 메시지
  const request = useRequest();

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();

    // 폼 내용
    const form = {};
    inputs.forEach(input => form[input.name] = e.target[input.name].value);

    try {
      setError('');
      await request.call(api.postSignin, form);
    } catch (err) {
      return setError('요청 오류');
    }

  }, []);

  return (
    <SignForm
      inputs={inputs}
      request={request}
      error={error}
      onSubmit={onSubmit}
    />
  );
};

export default React.memo(SigninFormContainer);