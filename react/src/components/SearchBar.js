import React, { useState } from 'react';
import classNames from 'classnames/bind';
import './SearchBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {
  const [active, setActive] = useState(false);
  const [value, setValue] = useState('');

  const onFocus = () => {
    setActive(true);
  }

  const onBlur = () => {
    setActive(false);
  }

  const onChange = (e) => {
    setValue(e.target.value);
  }

  return (
    <div className={classNames('SearchBar', {'active': active})}>
      <input
        type="text"
        name="search"
        placeholder="검색"
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
      />
      <FontAwesomeIcon className="search-button" icon={faSearch}/>
    </div>
  );
};

export default SearchBar;