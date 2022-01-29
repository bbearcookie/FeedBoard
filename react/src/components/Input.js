import React, { useCallback, useRef, useState } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Input.scss";

const Input = ({ type, icon, placeholder }) => {
  const [focus, setFocus] = useState(false); // input 포커싱 on/off
  const inputRef = useRef(null);

  const onClick = useCallback(() => inputRef.current.focus(), []); // 컴포넌트 클릭시 input 포커싱 처리
  const onFocus = useCallback(() => setFocus(true), []); // input 포커싱 on/off
  const onBlur = useCallback(() => setFocus(false), []); // input 포커싱 on/off

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
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={inputRef}
      />
    </div>
  );
};

export default Input;