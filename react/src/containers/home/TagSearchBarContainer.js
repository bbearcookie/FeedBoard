import React, { useCallback } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TagSearchBar from '../../components/home/TagSearchBar';
import { changeInput, insertActive } from '../../modules/tagTab';

const TagSearchBarContainer = () => {
  const navigate = useNavigate();

  const { tags, input } = useSelector(state => ({
    tags: state.tagTab.tags,
    input: state.tagTab.input
  }));

  const dispatch = useDispatch();
  const onChangeInput = useCallback(input => dispatch(changeInput(input)), [dispatch]);
  const onInsert = useCallback(text => {
    dispatch(insertActive(tags, text));
    return navigate(`?tag=${text}`);
  }, [dispatch, tags, navigate]);

  return (
    <TagSearchBar
      input={input}
      onChangeInput={onChangeInput}
      onInsert={onInsert}
    />
  );
};

export default React.memo(TagSearchBarContainer);