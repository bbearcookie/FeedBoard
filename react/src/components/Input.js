import React, { useCallback, useRef, useState } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Input.scss";

const Input = ({ type, name, value, placeholder, icon, inputRef, onChangeField }) => {
  const [focus, setFocus] = useState(false); // input 포커싱 on/off

  const onClick = useCallback(() => inputRef.current.focus(), [inputRef]); // 컴포넌트 클릭시 input 포커싱 처리
  const onFocus = useCallback(() => setFocus(true), []); // input 포커싱 on/off
  const onBlur = useCallback(() => setFocus(false), []); // input 포커싱 on/off

  const onChange = useCallback((e) => {
    onChangeField(e)
  }, [onChangeField]);

  return (
    <div className={classNames("Input", {"focus": focus})} onClick={onClick}>
      {icon ?
      <FontAwesomeIcon
        className="icon"
        size="lg"
        icon={icon}
      /> : null}
      <span className="tooltip">{placeholder}</span>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        ref={inputRef}
      />
    </div>
  );
};

Input.defaultProps = {
  type: 'text',
  name: '',
  value: '',
  placeholder: '',
  icon: null,
  inputRef: null,
  onChangeField: () => {},
}

export default Input;