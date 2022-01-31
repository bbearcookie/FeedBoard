import React, { useCallback, useRef, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { changeField, initializeForm } from '../../modules/form';
import SignForm from '../../components/SignForm';
import { faAddressCard, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import useRequest from '../../lib/useRequest';
import * as api from '../../lib/api';

const SignupFormContainer = () => {
  const [error, setError] = useState(''); // 화면에 보여줄 오류 메시지
  const submitRequest = useRequest();

  const formName = 'signup';
  const inputs = [
    {
      id: 0,
      type: 'text',
      name: 'username',
      placeholder: '아이디',
      icon: faAddressCard,
      ref: useRef(null)
    },
    {
      id: 1,
      type: 'password',
      name: 'password',
      placeholder: '비밀번호',
      icon: faLock,
      ref: useRef(null)
    },
    {
      id: 2,
      type: 'password',
      name: 'passwordConfirm',
      placeholder: '비밀번호 재확인',
      icon: faLock,
      ref: useRef(null)
    },
    {
      id: 3,
      type: 'text',
      name: 'nickname',
      placeholder: '닉네임',
      icon: faUser,
      ref: useRef(null)
    },
  ];

  const { signup: form } = useSelector(state => ({
    signup: state.form.signup
  }));

  const dispatch = useDispatch();

  // input 필드 값 변경 처리
  const onChangeField = useCallback((e) => {
    const { name, value } = e.target;
    dispatch(
      changeField({
        formName,
        fieldName: name,
        value
      })
    );
  }, [dispatch]);

  // 폼 전송 처리
  const onSubmit = useCallback(async (e) => {
    e.preventDefault();

    // 유효성 검사 에러 메시지 설정 후 해당 input을 focus시킴.
    function setErrorAndFocus(error, fieldName) {
      setError(error);
      inputs.find(input => input.name === fieldName).ref.current.focus();
    }
    
    let name = "username";
    if (form[name] === '') {
      setErrorAndFocus('아이디가 비어있어요.', name);
      return;
    }
    if (/[^a-zA-Z0-9]/.exec(form[name]) || form[name].length > 20) {
      setErrorAndFocus('아이디는 영어와 숫자를 포함해서 20글자까지 입력할 수 있어요.', name);
      return;
    };
    
    name = "password";
    if (form[name] === '') {
      setErrorAndFocus('비밀번호가 비어있어요.', name);
      return;
    }

    name = "passwordConfirm";
    if (form[name] === '') {
      setErrorAndFocus('비밀번호 재확인이 비어있어요.', name);
      return;
    }

    if (form.password !== form.passwordConfirm) {
      setErrorAndFocus('비밀번호가 일치하지 않아요.', name);
      return;
    }

    name = "nickname";
    if (form[name] === '') {
      setErrorAndFocus('닉네임이 비어있어요.', name);
      return;
    }

    try {
      setError('');
      await submitRequest.call(api.postSignup, form);
      dispatch(initializeForm(formName));
    } catch (err) {
      setError('전송 실패');
    }
  }, [dispatch, form, inputs, submitRequest]);

  return (
    <SignForm
      form={form}
      inputs={inputs}
      request={submitRequest}
      error={error}
      onChangeField={onChangeField}
      onSubmit={onSubmit}
    />
  );
};

export default React.memo(SignupFormContainer);