import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TagSearchBar from '../../components/home/TagSearchBar';
import { changeInput, insert } from '../../modules/tagTab';

const TagSearchBarContainer = () => {
  const { input } = useSelector(state => ({
    input: state.tagTab.input
  }));

  const dispatch = useDispatch();
  const onChangeInput = useCallback(input => dispatch(changeInput(input)), [dispatch]);
  const onInsert = useCallback(text => dispatch(insert(text)), [dispatch]);

  return (
    <TagSearchBar
      input={input}
      onChangeInput={onChangeInput}
      onInsert={onInsert}
    />
  );
};

export default React.memo(TagSearchBarContainer);