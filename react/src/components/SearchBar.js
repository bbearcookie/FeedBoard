import React, { useState } from 'react';
import classNames from 'classnames/bind';
import './SearchBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {
  const [active, setActive] = useState(false);

  const onFocus = () => {
    setActive(true);
  }

  const onBlur = () => {
    setActive(false);
  }

  return (
    <div className={classNames('SearchBar', {'active': active})}>
      <FontAwesomeIcon className="icon" icon={faSearch}/>
      <input
        type="text"
        name="search"
        placeholder="검색"
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
};

export default SearchBar;