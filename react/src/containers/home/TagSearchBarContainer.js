import React, { useCallback } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TagSearchBar from '../../components/home/TagSearchBar';
import { changeInput, insertActive, active, setActivePos } from '../../modules/tagTab';

const TagSearchBarContainer = () => {
  const navigate = useNavigate();

  const { tags, input } = useSelector(state => ({
    tags: state.tagTab.tags,
    input: state.tagTab.input
  }));

  const dispatch = useDispatch();
  const onChangeInput = useCallback(input => dispatch(changeInput(input)), [dispatch]);
  const onInsert = useCallback(text => {
    let check = tags.find(tag => tag.text === text);

    // 해당 text의 태그가 이미 있으면 그 태그 재활용, 없으면 새로 추가
    let result;
    if (check) {
      result = check;
    } else {
      result = dispatch(insertActive(text));
    }

    dispatch(setActivePos(0));
    dispatch(active(result.id));
    return navigate(`?tag=${result.text}`);
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