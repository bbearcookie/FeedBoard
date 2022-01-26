import React from 'react';
import "./TagListItem.scss";

const TagListItem = ({ text }) => {
  return (
    <span className="TagListItem">
      {text}
    </span>
  );
};

export default TagListItem;