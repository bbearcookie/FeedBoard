import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../components/Input';
import Button from '../components/Button';
import { faAddressCard, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { changeField } from '../modules/form';

const SignupFormContainer = () => {
  const { signup: form } = useSelector(state => ({
    signup: state.form.signup
  }));

  const dispatch = useDispatch();

  const onChangeField = useCallback((e) => {
    const { name, value } = e.target;
    dispatch(
      changeField({
        formName: 'signup',
        fieldName: name,
        value
      })
    );
  }, [dispatch]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    console.log(form);
  }, [form]);

  return (
    <form onSubmit={onSubmit}>
      <Input
        type="text"
        name="username"
        value={form.username}
        placeholder="아이디"
        icon={faAddressCard}
        onChangeField={onChangeField}
      />
      <Input
        type="password"
        name="password"
        value={form.password}
        placeholder="비밀번호"
        icon={faLock}
        onChangeField={onChangeField}
      />
      <Input
        type="password"
        name="passwordConfirm"
        value={form.passwordConfirm}
        placeholder="비밀번호 재확인"
        icon={faLock}
        onChangeField={onChangeField}
      />
      <Input
        type="text"
        name="nickname"
        value={form.nickname}
        placeholder="닉네임"
        icon={faUser}
        onChangeField={onChangeField}
      />
      <Button type="submit">전송</Button>
    </form>
  );
};

export default React.memo(SignupFormContainer);