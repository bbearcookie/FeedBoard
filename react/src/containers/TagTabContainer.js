import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TagTab from '../components/tag/tab/TagTab';
import { active, remove, insertActive, setActivePos } from '../modules/tagTab';
import * as tagTab from '../lib/tagTab';
import { useEffect } from 'react';

const TagTabContainer = ({ params }) => {
  let { tags, activePos } = useSelector(state => ({
    tags: state.tagTab.tags,
    activePos: state.tagTab.activePos
  }));
  let tagRefs = tagTab.getRefs(tags);

  const dispatch = useDispatch();
  const onRemove = useCallback(id => dispatch(remove(id)), [dispatch]);
  const onActive = useCallback(id => {
    let value = tagTab.getActivePos(tags, tagRefs, id);
    dispatch(setActivePos(value));
    dispatch(active(id));
  }, [dispatch, tags, tagRefs]);

  const getURL = (id) => {
    let url = `/`;

    if (id !== 0) {
      url += `?tag=${tags.find(tag => tag.id === id).text}`;
    }

    return url;
  }

  // 임의로 URL 주거나 새로고침 했을때 그에 맞는 태그 추가하고 활성화
  useEffect(() => {
    if (params.tag) {
      dispatch(insertActive(tags, params.tag));
    }
  }, []);

  return (
    <TagTab
      tags={tags}
      refs={tagRefs}
      activePos={activePos}
      getURL={getURL}
      onRemove={onRemove}
      onActive={onActive}
    />
  );
};

TagTabContainer.defaultProps = {
  params: {}
};

export default React.memo(TagTabContainer);