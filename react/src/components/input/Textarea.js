import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import classNames from 'classnames';
import './Textarea.scss';

const Textarea = ({ className, name, placeholder, inputRef, onChange }) => {
  return (
    <TextareaAutosize
      className={classNames("Textarea", className)}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      ref={inputRef}
  />
  );
};

Textarea.defaultProps = {
  className: '',
  name: '',
  placeholder: '',
  inputRef: undefined,
  onChange: () => {}
};

export default Textarea;