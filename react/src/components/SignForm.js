import React from 'react';
import Input from './Input';
import Button from './Button';
import LoadingSpinner from './LoadingSpinner';
import './SignForm.scss';

const SignForm = ({ form, inputs, request, error, onChangeField, onSubmit }) => {
  return (
    <form className="SignForm" onSubmit={onSubmit}>
      {request.loading ? <LoadingSpinner /> : null}
      {request.data ? <div>{request.data}</div> : null}
      {error ? <p className="error-message">{error}</p> : null}
      {inputs.map((input) => (
        <Input
          key={input.id}
          type={input.type}
          name={input.name}
          placeholder={input.placeholder}
          icon={input.icon}
          value={form[input.name]}
          inputRef={input.ref}
          onChangeField={onChangeField}
        />
      ))}
      <Button type="submit">전송</Button>
    </form>
  );
};

SignForm.defaultProps = {
  form: {},
  inputs: [],
  error: '',
  onChangeField: () => {},
  onSubmit: () => {}
}

export default SignForm;