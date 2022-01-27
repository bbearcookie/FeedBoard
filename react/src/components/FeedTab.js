import React, { useState } from 'react';
import './FeedTab.scss';
import FeedTabItem from './FeedTabItem';

const FeedTab = () => {
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

  const onClick = (id) => {
    setItemList(itemList.map((item =>
      item.id === id ?
      { ...item, active: true } :
      { ...item, active: false }
    )));
  }

  return (
    <div className="FeedTab">
      <div className="item-area">
        {itemList.map((item) => (
          <FeedTabItem key={item.id} id={item.id} text={item.text} active={item.active} onClick={onClick} />
        ))}
      </div>
      <div className="divider" />
    </div>
  );
};

export default FeedTab;