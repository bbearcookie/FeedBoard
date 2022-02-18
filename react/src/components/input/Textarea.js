import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import classNames from 'classnames';
import './Textarea.scss';

const Textarea = ({ className, name, placeholder, inputRef, onChange, onFocus, onBlur }) => {
  return (
    <TextareaAutosize
      className={classNames("Textarea", className)}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      ref={inputRef}
    />
  );
};

Textarea.defaultProps = {
  className: '',
  name: '',
  placeholder: '',
  inputRef: undefined,
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {}
};

export default Textarea;