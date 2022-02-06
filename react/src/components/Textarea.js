import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import classNames from 'classnames';
import './Textarea.scss';

const Textarea = ({ className, name, placeholder }) => {
  return (
    <TextareaAutosize
      className={classNames("Textarea", className)}
      name={name}
      placeholder={placeholder}
  />
  );
};

Textarea.defaultProps = {
  className: '',
  name: '',
  placeholder: ''
};

export default Textarea;