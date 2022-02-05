import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import classNames from 'classnames';
import './Textarea.scss';

const Textarea = ({ className, placeholder }) => {
  return (
    <TextareaAutosize
      className={classNames("Textarea", className)}
      placeholder={placeholder}
  />
  );
};

Textarea.defaultProps = {
  className: '',
  placeholder: ''
};

export default Textarea;