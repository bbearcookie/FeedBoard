import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TagTab from '../../components/home/TagTab';
import { active, remove } from '../../modules/tagTab';
import * as tagTab from '../../lib/tagTab';

const TagTabContainer = () => {
  let { tags } = useSelector(state => ({
    tags: state.tagTab.tags
  }));
  const [activePos, setActivePos] = useState(0);
  const tagRefs = tagTab.getRefs(tags);

  const dispatch = useDispatch();
  const onRemove = useCallback(id => dispatch(remove(id)), [dispatch]);
  const onActive = useCallback(id => {
    setActivePos(tagTab.getActivePos(tags, tagRefs, id));
    dispatch(active(id));
  }, [dispatch, tags, tagRefs]);

  return (
    <TagTab
      tags={tags}
      refs={tagRefs}
      activePos={activePos}
      onRemove={onRemove}
      onActive={onActive}
    />
  );
};

export default React.memo(TagTabContainer);