import React, { useCallback, useRef, useState } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Input.scss";

const Input = ({ type, icon, placeholder }) => {
  const [focus, setFocus] = useState(false);
  const [hover, setHover] = useState(false);
  const inputRef = useRef(null);

  const onClick = useCallback(() => inputRef.current.focus(), []); // 컴포넌트 클릭시 input 포커싱 처리
  const onFocus = useCallback(() => setFocus(true), []); // input 포커싱 on/off
  const onBlur = useCallback(() => setFocus(false), []); // input 포커싱 on/off
  const onMouseEnter = useCallback(() => setHover(true), []); // 툴팁 on/off
  const onMouseLeave = useCallback(() => setHover(false), []); // 툴팁 on/off

  return (
    <div className="Input_container">
      <div
        className={classNames("Input", {"focus": focus})}
        onClick={onClick}
      >
        {icon ?
        <div className="icon-area">
          <FontAwesomeIcon
            className="icon"
            size="lg"
            icon={icon}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
        </div> :
        null}
        <input
          type={type}
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
          ref={inputRef}
        />
      </div>
    <span className={classNames("tooltip", {"hover": hover})}>{placeholder}</span>
    </div>
  );
};

export default Input;