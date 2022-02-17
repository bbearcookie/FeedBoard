import React from 'react';
import qs from 'qs';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Tag from '../components/tag/Tag';
import { insertActive, setActivePos } from '../modules/tagTab';

const TagContainer = ({ className, tagId, value, onRemove }) => {
  const navigate = useNavigate();

  const { tags } = useSelector(state => ({
    tags: state.tagTab.tags
  }));

  const dispatch = useDispatch();
  const onInsert = useCallback(text => {
    dispatch(insertActive(tags, text));
    dispatch(setActivePos(0));
    return navigate(`?tag=${text}`);
  }, [dispatch, tags, navigate]);

  return (
    <Tag
      className={className}
      tagId={tagId}
      value={value}
      onInsert={onInsert}
      onRemove={onRemove}
    />
  );
};

TagContainer.defaultProps = {
  classNames: "",
  tagId: undefined,
  value: "",
  onRemove: undefined
}

export default TagContainer;