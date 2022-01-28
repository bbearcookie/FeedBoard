import React, { useRef, useState } from 'react';
import './TagTab.scss';
import TagTabItem from './TagTabItem';

const TagTab = () => {
  const [itemList, setItemList] = useState([
    {
      id: 0,
      text: "Global Feed",
      active: true
    },
    {
      id: 1,
      text: "Two Feed",
      active: false
    },
    {
      id: 2,
      text: "Feed C",
      active: false
    },
  ]);

  const nextId = useRef(3);

  const onClick = (id) => {
    setItemList(itemList.map((item =>
      item.id === id ?
      { ...item, active: true } :
      { ...item, active: false }
    )));
  }

  return (
    <div className="TagTab">
      <div className="item-area">
        {itemList.map((item) => (
          <TagTabItem key={item.id} id={item.id} text={item.text} active={item.active} onClick={onClick} />
        ))}
      </div>
      <div className="divider" />
    </div>
  );
};

export default TagTab;