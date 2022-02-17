import React, { useCallback, useRef, useState } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Input.scss";

const Input = ({
  className,
  type, name, value, maxLength,
  placeholder, autoComplete,
  icon,
  button,
  inputRef,
  onChange,
  onKeyPress,
}) => {
  const [focus, setFocus] = useState(false); // input 포커싱 on/off
  const refEl = useRef(null);
  if (!inputRef) inputRef = refEl; // 부모로부터 넘어온 inputRef가 없을 때에만 생성해서 사용

  const onClick = useCallback(() => inputRef ? inputRef.current.focus() : null, [inputRef]); // 컴포넌트 클릭시 input 포커싱 처리
  const onFocus = useCallback(() => setFocus(true), []); // input 포커싱 on/off
  const onBlur = useCallback(() => setFocus(false), []); // input 포커싱 on/off

  return (
    <div className={classNames("Input", {"focus": focus}, className)} onClick={onClick}>
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
        value={value ? value : ''}
        maxLength={maxLength ? maxLength : undefined}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        onKeyPress={onKeyPress}
        ref={inputRef}
      />
      {button ? button : null}
    </div>
  );
};

Input.defaultProps = {
  className: '',
  type: 'text',
  name: '',
  value: '',
  maxLength: null,
  placeholder: '',
  autoComplete: 'off',
  icon: null,
  button: null,
  inputRef: null,
  onChange: () => {},
  onKeyPress: () => {},
}

export default Input;