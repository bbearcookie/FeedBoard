import React, { useState } from 'react';
import './TagTab.scss';
import TagTabItem from './TagTabItem';

const TagTab = ({ tags, refs, activePos, onActive, onRemove }) => {
  return (
    <div className="TagTab">
      <div className="item-area">
        {tags.map((item) => (
          <TagTabItem
            key={item.id}
            id={item.id}
            text={item.text}
            active={item.active}
            activePos={activePos}
            itemRef={refs[item.id]}
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
  onActive: () => {},
  onRemove: null,
}

export default TagTab;