import React, { useCallback } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TagSearchBar from '../../components/home/TagSearchBar';
import { changeInput, insertActive, active } from '../../modules/tagTab';

const TagSearchBarContainer = () => {
  const navigate = useNavigate();

  const { input } = useSelector(state => ({
    input: state.tagTab.input
  }));

  const dispatch = useDispatch();
  const onChangeInput = useCallback(input => dispatch(changeInput(input)), [dispatch]);
  const onInsert = useCallback(text => {
    let result = dispatch(insertActive(text));
    dispatch(active(result.id));
    return navigate(`?tag=${result.text}`);
  }, [dispatch, navigate]);

  return (
    <TagSearchBar
      input={input}
      onChangeInput={onChangeInput}
      onInsert={onInsert}
    />
  );
};

export default React.memo(TagSearchBarContainer);