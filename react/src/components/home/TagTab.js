import React, { useState } from 'react';
import './TagTab.scss';
import TagTabItem from './TagTabItem';

const TagTab = ({ tags, refs, activePos, getURL, onActive, onRemove }) => {

  console.log(tags);
  return (
    <div className="TagTab">
      <div className="item-area">
        {tags.map((item, i) => (
          <TagTabItem
            key={item.id}
            id={item.id}
            text={item.text}
            active={item.active}
            activePos={activePos}
            itemRef={refs[i]}
            queryKey={item.queryKey}
            getURL={getURL}
            onActive={onActive}
            onRemove={onRemove}
          />
        ))}
      </div>
      <div className="divider" />
    </div>
  );
};

TagTab.defaultProps = {
  tags: [],
  refs: [],
  activePos: 0,
  getURL: () => {},
  onActive: () => {},
  onRemove: null,
}

export default TagTab;