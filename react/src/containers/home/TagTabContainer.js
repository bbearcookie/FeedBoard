import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TagTab from '../../components/home/TagTab';
import { active, remove } from '../../modules/tagTab';

const TagTabContainer = () => {
  const { tags } = useSelector(state => ({
    tags: state.tagTab.tags
  }));

  const dispatch = useDispatch();
  const onRemove = useCallback(id => dispatch(remove(id)), [dispatch]);
  const onActive = useCallback(id => dispatch(active(id)), [dispatch]);

  return (
    <TagTab
      tags={tags}
      onRemove={onRemove}
      onActive={onActive}
    />
  );
};

export default React.memo(TagTabContainer);