import React from 'react';
import './TagTab.scss';
import TagTabItem from './TagTabItem';

const TagTab = ({ tags, onRemove, onActive }) => {
  return (
    <div className="TagTab">
      <div className="item-area">
        {tags.map((item) => (
          <TagTabItem
            key={item.id}
            id={item.id}
            text={item.text}
            active={item.active}
            onActive={onActive}
            onRemove={onRemove}
          />
        ))}
      </div>
      <div className="divider" />
    </div>
  );
};

export default TagTab;