import React from 'react';
import './TrendTagListItem.scss';

const TrendTagListItem = ({ text }) => {
  return (
    <span className="TrendTagListItem">
      {text}
    </span>
  );
};

export default TrendTagListItem;