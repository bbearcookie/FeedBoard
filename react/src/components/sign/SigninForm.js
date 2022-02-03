import React, { useState, useCallback, createRef } from 'react';
import useRequest from '../../lib/useRequest';
import { faAddressCard, faLock } from '@fortawesome/free-solid-svg-icons';
import SignForm from './SignForm';
import * as api from '../../lib/api';
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

const SigninFormContainer = () => {
  const [error, setError] = useState(''); // 화면에 보여줄 오류 메시지
  const request = useRequest();
  const navigate = useNavigate();

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

    try {
      setError('');
      const data = await request.call(api.postSignin, form);
      sessionStorage.setItem('user', JSON.stringify({ username: form['username'] }));
      setError(data.message);
      return navigate("/"); // redirect
    } catch (err) {
      if (err.response)
        if (err.response.status === 401) {
          const { message, field } = err.response.data;
          return setErrorAndFocus(message, field);
        }
      return setError('요청 오류');
    }

  }, []);

  const checkTest = async () => {
    console.log(checkTest);
    const data = await request.call(api.getLoggedCheck);
    console.log(data);
  }

  return (
    <>
      <SignForm
        inputs={inputs}
        request={request}
        error={error}
        onSubmit={onSubmit}
      />
      <button type="button" onClick={checkTest}>내 아이디는?</button>
    </>
  );
};

export default React.memo(SigninFormContainer);