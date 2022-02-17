import React from 'react';
import Input from '../input/Input';
import Button from '../input/Button';
import LoadingSpinner from '../LoadingSpinner';
import './SignForm.scss';

const SignForm = ({ form, inputs, request, error, onChange, onSubmit }) => {
  return (
    <form className="SignForm" onSubmit={onSubmit}>
      {request.loading ? <LoadingSpinner /> : null}
      {error ? <p className="error-message">{error}</p> : null}
      {inputs.map((input) => (
        <Input
          key={input.id}
          type={input.type}
          name={input.name}
          value={form[input.name]}
          placeholder={input.placeholder}
          icon={input.icon}
          inputRef={input.ref}
          onChange={onChange}
        />
      ))}
      <Button type="submit">전송</Button>
    </form>
  );
};

SignForm.defaultProps = {
  form: {},
  inputs: [],
  request: {},
  error: '',
  onChange: () => {},
  onSubmit: () => {}
}

export default SignForm;