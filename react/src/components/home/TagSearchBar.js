import React, { useState, useCallback } from 'react';
import classNames from 'classnames/bind';
import './TagSearchBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const TagSearchBar = ({ input, onChangeInput, onInsert }) => {
  const [active, setActive] = useState(false);

  // 검색바 활성화, 비활성화에 따른 스타일 적용
  const onFocus = useCallback(() => setActive(true), []);
  const onBlur = useCallback(() => setActive(false), []);

  // input 값 변경시 액션 함수 실행해서 리덕스 스토어에 값 적용
  const onChange = useCallback((e) => onChangeInput(e.target.value), [onChangeInput]);

  // 작성 완료시 태그탭에 새로운 태그 추가하고 input 값 초기화
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if (input) {
      onInsert(input);
      onChangeInput('');
    }
  }, [input, onInsert, onChangeInput]);

  return (
    <form className={classNames('TagSearchBar', {'active': active})} onSubmit={onSubmit}>
      <input
        type="text"
        name="search"
        placeholder="검색"
        value={input}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
      />
      <FontAwesomeIcon
        className="search-button"
        icon={faSearch}
        onClick={onSubmit}/>
    </form>
  );
};

export default TagSearchBar;